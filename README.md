# **Employee Manager — Full-Stack (Node/Express/TypeORM + React/Vite)**

Full stack app to manage employees.

## Stack
- Backend: Node.js + Express + TypeORM + PostgreSQL + JWT
- Frontend: React (Vite) + Tailwind
- Auth: Register/Login con rutas protegidas

## Backend

```bash

cd back
cp .env.example .env   # completar credenciales
npm i
npm run seed           # poblar DB (opcional)
npm start            # http://localhost:3001
```

## Frontend

```bash

cd front
cp .env.example .env   # ajustar VITE_API_BASE_URL si hace falta
npm i
npm run dev            # http://localhost:5173
```

## Endpoints
- GET /employees
- GET /employees/:id
- GET /employees/areas
- POST /employees        (JWT)
- PUT /employees/:id     (JWT)
- DELETE /employees/:id  (JWT)
- POST /auth/register
- POST /auth/login
" > README.md
