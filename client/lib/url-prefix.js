const isDev = window.location.hostname === "localhost";
export const URL_PREFIX = isDev
  ? "http://localhost:3000"
  : "https://tu-app.onrender.com";
