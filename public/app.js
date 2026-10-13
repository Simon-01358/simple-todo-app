const list = document.getElementById("list");
const form = document.getElementById("add-form");
const input = document.getElementById("new-todo");
const statusEl = document.getElementById("status");

async function api(path, options) {
  const res = await fetch(path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.status === 204 ? null : res.json();
}

function render(todos) {
  list.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    if (todo.done) li.classList.add("done");

    const text = document.createElement("span");
    text.textContent = todo.text;
    text.title = "Click to toggle";
    text.addEventListener("click", async () => {
      await api(`/api/todos/${todo.id}`, { method: "PATCH" });
      load();
    });

    const del = document.createElement("button");
    del.className = "del";
    del.textContent = "Delete";
    del.addEventListener("click", async () => {
      await api(`/api/todos/${todo.id}`, { method: "DELETE" });
      load();
    });

    li.append(text, del);
    list.appendChild(li);
  });
}

async function load() {
  try {
    render(await api("/api/todos"));
    const health = await api("/health");
    statusEl.textContent = `Backend connected (up ${health.uptimeSeconds}s)`;
    statusEl.className = "status ok";
  } catch (err) {
    statusEl.textContent = "Cannot reach backend";
    statusEl.className = "status err";
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  await api("/api/todos", { method: "POST", body: JSON.stringify({ text }) });
  input.value = "";
  load();
});

load();
