import { URL_PREFIX } from "../lib/url-prefix.js";

export async function login(email, password) {
  try {
    const response = await fetch(`${URL_PREFIX}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}
