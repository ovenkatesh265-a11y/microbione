# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

## Backend Server & Analytics

This project includes an Express/MongoDB backend located in `server/`. It handles
feedback submissions and visit tracking for the front-end analytics dashboard.

### Setup

1. **Install backend dependencies**:
   ```bash
   cd server && npm install
   ```
2. **Create/modify `server/.env`** with the following values (example):
   ```env
   PORT=5000
   MONGODB_URI=mongodb://<user>:<password>@host1,host2,.../dbname?options
   ```
   Replace with your Atlas connection string. A sample is already included.
3. **Start the server**:
   ```bash
   cd server && npm run dev  # or npm start for production
   ```

The API will be available on `http://localhost:5000` by default. It exposes:

- `POST /api/feedback` — save user feedback
- `GET  /api/feedback` — retrieve all feedback
- `POST /api/visit`    — increment a visitor counter
- `GET  /api/visits`   — fetch total visit count

### Front‑end configuration

The React application reads the backend URL from an environment variable.
Update the root `.env` file before running Vite:
```env
VITE_API_URL=http://localhost:5000   # change to deployed API when needed
```

Restart `npm run dev` after changing any `.env` file so Vite can reload the value.

With the server running and `VITE_API_URL` set appropriately, the **Feedback**
sidebar and **View Analytics** button will communicate with your MongoDB-backed
API and start recording live data.
