import { login } from "../services/login.js";

const form = document.querySelector(".login-form");
const errorMsg = document.querySelector(".login-error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  errorMsg.style.display = "none";
  errorMsg.textContent = "";

  try {
    const data = await login(email, password);
    window.location.href = "../index.html";
  } catch (error) {
    errorMsg.style.display = "block";
    errorMsg.textContent = error.message;
    console.error(error.message);
  }
});
