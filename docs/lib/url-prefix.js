const isDev = window.location.hostname === "localhost";
export const URL_PREFIX = isDev
  ? "http://localhost:3000"
  : "https://programacion-3-tp-3.onrender.com";
