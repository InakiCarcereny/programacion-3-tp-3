import { URL_PREFIX } from "../lib/url-prefix.js";

export async function getProfile(id) {
  try {
    const response = await fetch(`${URL_PREFIX}/perfil/${id}`);

    if (!response.ok) {
      throw new Error(`Error fetching profile: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
}
