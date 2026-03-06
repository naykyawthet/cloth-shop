# Cloth Shop (Frontend + Backend)

This project now includes:

- A Vite + React frontend.
- A lightweight Node backend API (no external backend dependencies required).

## Scripts

- `npm run dev` — starts the frontend only.
- `npm run backend` — starts the backend API on `http://localhost:4000`.
- `npm run dev:full` — starts backend and frontend together.
- `npm run build` — builds the frontend for production.
- `npm run lint` — runs ESLint.

## Backend API

Base URL: `http://localhost:4000`

### `GET /api/health`
Health check endpoint.

### `GET /api/products`
Returns product data used by the frontend product grid.

### `POST /api/subscribe`
Subscribes an email address.

Request body:

```json
{ "email": "hello@example.com" }
```

Success response:

```json
{ "message": "Thanks for subscribing!", "alreadySubscribed": false }
```
