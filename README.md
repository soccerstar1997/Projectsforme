# Projectsforme

A small fullstack starter: keep a list of the projects you are working on.

- `apps/web` — React + Vite front end (dev server on port 3000 in the sandbox)
- `apps/api` — Express API, talks to Postgres through `pg`
- `db` — Postgres 16

The front end calls the API at `/api/...`; the Vite dev server proxies those
requests to the API container, so everything is served from a single origin.

## Run it

```bash
docker compose -f docker-compose.base44.yml up -d --build
```

Then open <http://localhost:3000>.

## API

| Method | Path                | Description            |
| ------ | ------------------- | ---------------------- |
| GET    | `/api/projects`     | List projects          |
| POST   | `/api/projects`     | Create a project       |
| DELETE | `/api/projects/:id` | Delete a project       |

The `projects` table is created on API startup (`CREATE TABLE IF NOT EXISTS`),
so there is no separate migration step.

## Configuration

| Variable    | Service | Purpose                                        |
| ----------- | ------- | ---------------------------------------------- |
| `PORT`      | api     | API port (defaults to `8000`)                  |
| `DATABASE_URL` | api  | Postgres connection string                     |
| `API_URL`   | web     | Proxy target for `/api` (compose sets `http://api:8000`) |

No external services or credentials are required.
