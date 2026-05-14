import { getProfile } from "../services/profile.js";
import { URL_PREFIX } from "../lib/url-prefix.js";

async function renderProfile() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const container = document.querySelector(".profile-container");

  if (!user) {
    window.location.href = "../pages/login.html";
    return;
  }

  try {
    const profile = await getProfile(user.id);

    container.innerHTML = `
      <div class="bg-container">
        <section class="sections-container">
          <div class="profile-info-container">
            <img
              src="${URL_PREFIX}${profile.imagenPerfil}"
              alt="${profile.nombre}"
              class="profile-picture"
            >

            <span class="profile-verified">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M18.333 6a3.667 3.667 0 0 1 3.667 3.667v8.666a3.667 3.667 0 0 1 -3.667 3.667h-8.666a3.667 3.667 0 0 1 -3.667 -3.667v-8.666a3.667 3.667 0 0 1 3.667 -3.667zm-3.333 -4c1.094 0 1.828 .533 2.374 1.514a1 1 0 1 1 -1.748 .972c-.221 -.398 -.342 -.486 -.626 -.486h-10c-.548 0 -1 .452 -1 1v9.998c0 .32 .154 .618 .407 .805l.1 .065a1 1 0 1 1 -.99 1.738a3 3 0 0 1 -1.517 -2.606v-10c0 -1.652 1.348 -3 3 -3zm1.293 9.293l-3.293 3.292l-1.293 -1.292a1 1 0 0 0 -1.414 1.414l2 2a1 1 0 0 0 1.414 0l4 -4a1 1 0 0 0 -1.414 -1.414"
                />
              </svg>
            </span>

            <div class="profile-details-container">
              <div class="profile-header-container">
                <div class="profile-header">
                  <small class="profile-role">${profile.rol}</small>
                  <h2 class="profile-name">${profile.nombre}</h2>
                </div>

                <button class="logout-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-logout"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                    <path d="M9 12h12l-3 -3" />
                    <path d="M18 15l3 -3" />
                  </svg>

                  Cerrar Sesión
                </button>
              </div>

              <div class="profile-details">
                <div class="profile-detail-item">
                  <span class="profile-detail-label">EMAIL</span>
                  <span class="profile-detail-value">${profile.email}</span>
                </div>
                <div class="profile-detail-item">
                  <span class="profile-detail-label">FECHA DE REGISTRO</span>
                  <span class="profile-detail-value">${profile.fechaRegistro}</span>
                </div>
                <div class="profile-detail-item">
                  <span class="profile-detail-label">NIVEL DE CUENTA</span>
                  <span class="profile-detail-value">${profile.nivelCuenta}</span>
                </div>
                <div class="profile-detail-item">
                  <span class="profile-detail-label">TELÉFONO</span>
                  <span class="profile-detail-value">${profile.telefono}</span>
                </div>
                <div class="profile-detail-item">
                  <span class="profile-detail-label">EMPRESA</span>
                  <span class="profile-detail-value">${profile.empresa}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div class="bg-container-accent">
        <section class="sections-container">
          <div class="orders-container">
            <h3 class="orders-title">Últimos Pedidos</h3>
            <p class="orders-description">Tu viaje con la Arquitectura del Servicio Curatorial.</p>

            <div class="orders-list">
              ${profile.pedidos
                .map(
                  (pedido) => `
                <article class="order-item">
                  <img class="order-image" src="${URL_PREFIX}${pedido.imagen}" alt="${pedido.nombre}">
                  <div class="order-details">
                    <h4 class="order-title">${pedido.nombre}</h4>
                    <div class="order-meta">
                      <span class="order-id">ID Pedido: #${pedido.id}</span>
                      <small class="order-separator">•</small>
                      <span class="order-date">${pedido.fecha}</span>
                    </div>
                  </div>
                  <span class="order-status">COMPLETADO</span>
                </article>
              `,
                )
                .join("")}
            </div>
          </div>
        </section>
      </div>
    `;

    const logoutButton = container.querySelector(".logout-button");

    logoutButton.addEventListener("click", () => {
      sessionStorage.removeItem("user");
      window.location.href = "../pages/login.html";
    });
  } catch (error) {
    console.error("Error loading profile:", error);
  }
}

renderProfile();
