# Agent notes

## Run the dev stack

```bash
docker compose -f docker-compose.base44.yml up -d
```

Web preview: <http://localhost:3000> (host 3000 → Vite `5173`).

## Things that are not obvious

- **Single origin wiring.** The API (`apps/api`, port 8000) is *not* published to the
  host. The Vite dev server proxies `/api/*` to `http://api:8000` (see
  `apps/web/vite.config.js` and the `API_URL` env in compose), so the browser only
  ever talks to port 3000. Adding a CORS config is therefore unnecessary.
- **Dependencies install at container start.** `node_modules` is a named Docker
  volume in each app service, and `npm install` runs before the dev command. After
  changing a `package.json`, recreate the affected service
  (`docker compose -f docker-compose.base44.yml up -d --force-recreate web`) so the
  install reruns. Both apps commit a `package-lock.json`; keep it in sync.
- **No migration tool.** The API creates the `projects` table with
  `CREATE TABLE IF NOT EXISTS` on startup (`apps/api/src/db.js`). Schema changes to
  existing tables need a manual `ALTER`, since `IF NOT EXISTS` will not alter them.
- **No `/health` route.** Compose healthchecks probe real endpoints: the API checks
  `GET /api/projects` (so it also proves the database connection), the web service
  checks `GET /` on 5173. Both use `node -e "fetch(...)"` because the images have no
  curl/wget.
- **Sandbox-only Vite config.** When `BASE44_PREVIEW_MODE === "1"`, `vite.config.js`
  adds the `.${BASE44_SANDBOX_HOST_DOMAIN}` host wildcard and points HMR at
  `wss://<page host>:443`, which is what the Base44 preview proxy needs. When the
  flag is unset the config is a plain local dev server (http, no extra hosts).
  Vite also appends the platform-provided `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS`.
- **No external credentials.** Postgres is local with development credentials in
  compose; nothing is read from `/run/base44/app.env`, so no secrets are required.
  `db_data` holds the database — never delete it to refresh dependencies.

## Verify it works

```bash
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/          # 200, Vite dev HTML
curl -s http://localhost:3000/api/projects                               # JSON array
curl -s -X POST -H 'Content-Type: application/json' \
  -d '{"name":"smoke test"}' http://localhost:3000/api/projects          # 201, then DELETE it
```

A 403 "Blocked request. This host ... is not allowed" means the request reached Vite
with a Host header outside the allowlist (e.g. a `Host` header missing the sandbox id
subdomain), not an application error.

## Tests

None configured yet — there is no test runner in either app.
