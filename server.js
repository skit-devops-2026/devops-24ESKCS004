const http = require("http");
const fs = require("fs");
const path = require("path");
const { isValidTodoText } = require("./utils");

const PORT = process.env.PORT || 3000;

let todos = [
    { id: 1, text: "Explore Docker and GitHub Actions", completed: false },
    { id: 2, text: "Run automated tests inside container", completed: true }
];
let nextId = 3;

const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    const pathname = parsedUrl.pathname;

    // Serve static files from public/
    if (req.method === "GET" && (pathname === "/" || pathname === "/index.html")) {
        const filePath = path.join(__dirname, "public", "index.html");
        fs.readFile(filePath, "utf-8", (err, content) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Internal Server Error");
                return;
            }
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            res.end(content);
        });
        return;
    }

    // API: GET /api/todos
    if (req.method === "GET" && pathname === "/api/todos") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(todos));
        return;
    }

    // API: POST /api/todos
    if (req.method === "POST" && pathname === "/api/todos") {
        let body = "";
        req.on("data", chunk => { body += chunk; });
        req.on("end", () => {
            try {
                const data = JSON.parse(body);
                if (!isValidTodoText(data.text)) {
                    res.writeHead(400, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: "Invalid todo text" }));
                    return;
                }
                const newTodo = {
                    id: nextId++,
                    text: data.text.trim(),
                    completed: false
                };
                todos.push(newTodo);
                res.writeHead(201, { "Content-Type": "application/json" });
                res.end(JSON.stringify(newTodo));
            } catch (err) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Invalid JSON body" }));
            }
        });
        return;
    }

    // API: DELETE /api/todos/:id
    if (req.method === "DELETE" && pathname.startsWith("/api/todos/")) {
        const id = parseInt(pathname.split("/")[3], 10);
        todos = todos.filter(t => t.id !== id);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true }));
        return;
    }

    // API: PUT /api/todos/:id (toggle completion)
    if (req.method === "PUT" && pathname.startsWith("/api/todos/")) {
        const id = parseInt(pathname.split("/")[3], 10);
        const todo = todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(todo));
        } else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Todo not found" }));
        }
        return;
    }

    // Health check endpoint
    if (req.method === "GET" && pathname === "/health") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ status: "healthy", timestamp: new Date().toISOString() }));
        return;
    }

    // 404 for unrecognized routes
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not Found" }));
});

if (require.main === module) {
    server.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}/`);
    });
}

module.exports = server;
