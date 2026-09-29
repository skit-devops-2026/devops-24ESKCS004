const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const { isValidTodoText } = require("./utils");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/todos";

const client = require("prom-client");

// Collect default metrics (CPU, memory, event loop lag, etc.)
client.collectDefaultMetrics({ register: client.register });

// Custom Prometheus metrics for HTTP requests
const httpRequestDurationSeconds = new client.Histogram({
    name: "http_request_duration_seconds",
    help: "Duration of HTTP requests in seconds",
    labelNames: ["method", "route", "code"],
    buckets: [0.05, 0.1, 0.3, 0.5, 1, 2, 5]
});

const httpRequestsTotal = new client.Counter({
    name: "http_requests_total",
    help: "Total number of HTTP requests",
    labelNames: ["method", "route", "code"]
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Metrics recording middleware
app.use((req, res, next) => {
    const start = process.hrtime();
    res.on("finish", () => {
        const diff = process.hrtime(start);
        const durationInSeconds = diff[0] + diff[1] / 1e9;
        const route = req.route ? req.route.path : req.path;
        httpRequestDurationSeconds.labels(req.method, route, String(res.statusCode)).observe(durationInSeconds);
        httpRequestsTotal.labels(req.method, route, String(res.statusCode)).inc();
    });
    next();
});

// MongoDB Schema & Model
const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Todo = mongoose.model("Todo", todoSchema);

// Connect to MongoDB
mongoose.connect(MONGO_URL)
    .then(() => {
        console.log(`Connected to MongoDB at ${MONGO_URL}`);
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err.message);
    });

// Routes
// GET /todos - Fetch all todos
app.get("/todos", async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).json({ error: "Database not connected. MongoDB connection error." });
        }
        const todos = await Todo.find().sort({ createdAt: -1 });
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch todos", details: err.message });
    }
});

// POST /todos - Create a new todo
app.post("/todos", async (req, res) => {
    try {
        const text = req.body && req.body.text;
        if (!isValidTodoText(text)) {
            return res.status(400).json({ error: "Invalid todo text. Text must be a non-empty string." });
        }
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).json({ error: "Database not connected. MongoDB connection error." });
        }
        const newTodo = new Todo({ text: text.trim() });
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (err) {
        res.status(500).json({ error: "Failed to create todo", details: err.message });
    }
});

// DELETE /todos/:id - Delete a todo by ID
app.delete("/todos/:id", async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).json({ error: "Database not connected. MongoDB connection error." });
        }
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.json({ message: "Todo deleted successfully", id: req.params.id });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete todo", details: err.message });
    }
});

// PUT /todos/:id - Toggle completion status
app.put("/todos/:id", async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).json({ error: "Database not connected. MongoDB connection error." });
        }
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        todo.completed = !todo.completed;
        const updated = await todo.save();
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: "Failed to update todo", details: err.message });
    }
});

// Alias for /api/todos to maintain full backwards compatibility
app.get("/api/todos", (req, res) => res.redirect(307, "/todos"));
app.post("/api/todos", (req, res) => res.redirect(307, "/todos"));
app.delete("/api/todos/:id", (req, res) => res.redirect(307, `/todos/${req.params.id}`));

// Prometheus metrics endpoint
app.get("/metrics", async (req, res) => {
    try {
        res.set("Content-Type", client.register.contentType);
        res.end(await client.register.metrics());
    } catch (err) {
        res.status(500).end(err.message);
    }
});

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({
        status: "healthy",
        mongodb: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
        port: PORT,
        timestamp: new Date().toISOString()
    });
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

module.exports = app;
