import { getServices } from "../services/services.js";
import { URL_PREFIX } from "../lib/url-prefix.js";

const container = document.querySelector(".services-cards");
const input = document.querySelector("#services-search");

function render(services) {
  container.innerHTML = services
    .map(
      (servicio) => `
      <article class="card">
        <img src="${URL_PREFIX}${servicio.imagen}" alt="${servicio.nombre}">
        <div class="card-box">
          <h3>${servicio.nombre} <span>$${servicio.precio}</span></h3>
          <p>${servicio.descripcion}</p>
          <a href="#">VER MÁS →</a>
        </div>
      </article>
    `,
    )
    .join("");
}

async function renderServices() {
  try {
    const services = await getServices();

    render(services);

    input.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase();
      const filtered = services.filter((s) =>
        s.nombre.toLowerCase().includes(query),
      );
      render(filtered);
    });
  } catch (error) {
    container.innerHTML = "<p>Error al cargar los servicios.</p>";
  }
}

renderServices();
