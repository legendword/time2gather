# time2gather

Open-source meeting time planning tool. Pick a few candidate dates, share the
link, and have everyone mark when they're available — then read off the best
overlap from a single chart.

## Stack

- **Frontend** — React 17 + TypeScript + Chakra UI (Create React App)
- **Backend** — Node.js + Express + MongoDB
- **Storage** — MongoDB

## Quick start

Requires Docker + Docker Compose.

```bash
git clone https://github.com/legendword/time2gather.git
cd time2gather
docker compose up --build
```

Open <http://localhost:8080>.

To override the frontend host port or database name, copy `.env.example` to
`.env` and edit it.

## Project layout

```
time2gather/
├── frontend/          React SPA (CRA)
├── backend/           Express + MongoDB API
├── docker-compose.yml mongo + backend + frontend
└── .env.example       host port / db name overrides
```

## Configuration

Environment variables read by the backend (set automatically by Docker Compose):

| Var         | Default                     | Notes                                  |
| ----------- | --------------------------- | -------------------------------------- |
| `MONGO_URI` | `mongodb://mongo:27017`     | MongoDB connection string              |
| `MONGO_DB`  | `time2gather`               | Database name                          |
| `PORT`      | `8000`                      | Backend HTTP port (inside container)   |

The frontend reads `REACT_APP_API_BASE_URL` at build time. Defaults to `/api`,
which the bundled nginx proxies to the backend service. Override at build time
to point the SPA at a different backend.

## Development without Docker

```bash
# Terminal 1 — start MongoDB however you like (or just `docker compose up mongo`)

# Terminal 2 — backend
cd backend
npm install
MONGO_URI=mongodb://localhost:27017 node time2gather.js

# Terminal 3 — frontend
cd frontend
npm install
REACT_APP_API_BASE_URL=http://localhost:8000 npm start
```

## API

All routes are mounted at the backend root (or under `/api/` when going through
the bundled frontend nginx).

- `GET /` — health check
- `POST /` — create event
  - body: `{ title, dates, times, allowEdits }`
  - returns: `{ success, eventId }`
- `GET /:eventId` — fetch event
- `POST /:eventId` — add or update an attendee's availability
  - body: `{ name, available }`

## License

See repository.
