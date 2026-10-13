const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000; // Render injects PORT

app.use(express.json());

// ---- Frontend: serve static files from /public ----
app.use(express.static(path.join(__dirname, "public")));

// ---- Backend: in-memory data store (resets on restart) ----
let todos = [
  { id: 1, text: "Open this app on Render", done: true },
  { id: 2, text: "Add your own to-do", done: false },
];
let nextId = 3;

// Health check (Render can use this to know the service is alive)
app.get("/health", (req, res) => {
  res.json({ status: "ok", uptimeSeconds: Math.round(process.uptime()) });
});

// List all todos
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

// Create a todo
app.post("/api/todos", (req, res) => {
  const text = (req.body.text || "").trim();
  if (!text) return res.status(400).json({ error: "text is required" });
  const todo = { id: nextId++, text, done: false };
  todos.push(todo);
  res.status(201).json(todo);
});

// Toggle done / not done
app.patch("/api/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === Number(req.params.id));
  if (!todo) return res.status(404).json({ error: "not found" });
  todo.done = !todo.done;
  res.json(todo);
});

// Delete a todo
app.delete("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const before = todos.length;
  todos = todos.filter((t) => t.id !== id);
  if (todos.length === before) return res.status(404).json({ error: "not found" });
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
