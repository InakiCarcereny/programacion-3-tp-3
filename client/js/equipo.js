import { URL_PREFIX } from "../lib/url-prefix.js";
import { getTeam } from "../services/team.js";

async function renderTeam() {
  const container = document.querySelector(".team-members");

  try {
    const team = await getTeam();
    container.innerHTML = team
      .map(
        (member) => `
      <article class="team-member">
        <img src="${URL_PREFIX}${member.foto}" alt="Foto de ${member.nombre}" />
        <div>
          <h3>${member.nombre}</h3>
          <small>${member.rol}</small>
        </div>
        <p>${member.descripcion}</p>
      </article>
    `,
      )
      .join("");
  } catch (error) {
    container.innerHTML = "<p>Error al cargar el equipo.</p>";
  }
}

renderTeam();
