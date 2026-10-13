# Simple To-Do App (Node/Express + vanilla JS)

A tiny full-stack app for testing a deployment on Render.

- **Frontend:** `public/` (HTML, CSS, JavaScript) runs in the browser.
- **Backend:** `server.js` (Node + Express) serves the frontend and a JSON API.
- **Data:** kept in memory (resets when the server restarts or Render's free tier spins down).

## API

| Method | Path              | What it does              |
|--------|-------------------|---------------------------|
| GET    | `/health`         | Health check              |
| GET    | `/api/todos`      | List all to-dos           |
| POST   | `/api/todos`      | Create one (`{ "text" }`) |
| PATCH  | `/api/todos/:id`  | Toggle done / not done    |
| DELETE | `/api/todos/:id`  | Delete one                |

## Run locally

```bash
npm install
npm start
# open http://localhost:3000
```

## Deploy on Render

1. Push this folder to a new GitHub repository.
2. In Render: **New +** > **Web Service** > connect the repo.
3. Settings (auto-filled if you use `render.yaml` via **New + > Blueprint**):
   - Runtime: **Node**
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Health Check Path: `/health`
   - Plan: **Free**
4. Click **Create Web Service**. When the build finishes, open the `.onrender.com` URL.

Note: free instances sleep after ~15 min of inactivity, so the first request afterwards can take ~30-60 seconds.
