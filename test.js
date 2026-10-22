const assert = require("assert");
const { isValidTodoText } = require("./utils");
const app = require("./server");

assert.strictEqual(isValidTodoText("Buy milk"), true);
assert.strictEqual(isValidTodoText(""), false);
assert.strictEqual(isValidTodoText("   "), false);
assert.strictEqual(isValidTodoText(123), false);

// Verify server routes and health endpoints
async function runServerTests() {
    const server = app.listen(0, "0.0.0.0", async () => {
        const port = server.address().port;
        try {
            // Verify GET /
            const rootRes = await fetch(`http://127.0.0.1:${port}/`);
            assert.strictEqual(rootRes.status, 200);
            const rootData = await rootRes.json();
            assert.strictEqual(rootData.status, "ok");
            assert.strictEqual(rootData.message, "Server is running");

            // Verify GET /health
            const healthRes = await fetch(`http://127.0.0.1:${port}/health`);
            assert.strictEqual(healthRes.status, 200);
            const healthData = await healthRes.json();
            assert.strictEqual(healthData.status, "ok");
            assert.strictEqual(healthData.message, "Server is running");

            // Verify CORS headers
            assert.strictEqual(healthRes.headers.get("access-control-allow-origin"), "*");

            console.log("Endpoint & health check tests passed.");
            server.close(() => {
                console.log("All tests passed.");
                process.exit(0);
            });
        } catch (err) {
            console.error("Endpoint verification failed:", err);
            server.close(() => process.exit(1));
        }
    });
}

runServerTests();

