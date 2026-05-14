import { URL_PREFIX } from "../lib/url-prefix.js";

export async function getServices() {
  try {
    const response = await fetch(`${URL_PREFIX}/servicios`);

    if (!response.ok) {
      throw new Error(`Error fetching services: ${response.statusText}`);
    }

    const services = await response.json();

    return services;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
}
