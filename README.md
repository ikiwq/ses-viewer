# SES Viewer

A lightweight email viewer for [LocalStack](https://localstack.cloud) SES. It polls the LocalStack SES endpoint and displays emails in a Gmail-style two-pane layout.

## Features

- Two-pane split layout: email list sidebar + reading pane
- Live polling every 5 seconds
- Client-side search/filter
- HTML, plain text, and raw email body rendering

## Quick Start

### Docker Compose

```bash
docker compose up --build -d
```

Open [http://localhost:5050](http://localhost:5050).

### Local Dev

```bash
npm install
node server.js
```

## Configuration

| Variable | Default | Description |
|---|---|---|
| `PORT` | `5050` | Server port |
| `LOCALSTACK_URL` | `http://localhost:4566` | LocalStack endpoint |

## Tech Stack

- Node.js + Express
- EJS templates
- Tailwind CSS (CDN)
