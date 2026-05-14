![Preview](/docs/assets/images/image.png)

<div align="center">

# Curatorial

### Plataforma de gestión y exploración de servicios de arquitectura curatorial.

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/css-%23663399.svg?style=for-the-badge&logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Node.js](https://img.shields.io/badge/node.js-%23339933.svg?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)


## Integrantes - Grupo N-7

Iñaki Carcereny · Valentín De Pascale · Joaquín Marcilese · Ezequiel Barrionuevo · Alan Axel Hansen

</div>

---

## Descripción

Curatorial es una aplicación web que permite explorar y contratar servicios de arquitectura curatorial de manera simple e intuitiva. Cada servicio muestra información detallada sobre precio y descripción, con búsqueda en tiempo real por nombre. La aplicación incluye autenticación de usuarios, visualización de perfiles de equipo y acceso al perfil personal con historial de pedidos.

---

## Flujo y metodología de trabajo

| Rama | Descripción |
|------|-------------|
| `main` | Versión final de producción |
| `dev` | Integración de todas las features |
| `feature/*` | Nuevas funcionalidades |
| `docs/*` | Cambios en documentación |

El proyecto siguió una metodología de trabajo colaborativa basada en **Git Flow**, donde cada nueva funcionalidad se desarrolló en ramas independientes con el prefijo `feature/`, manteniendo la rama principal estable en todo momento. Una vez verificado que la funcionalidad cumplía con los requerimientos, se abría un Pull Request hacia la rama `dev` donde el equipo revisaba los cambios antes de aprobar el merge.

La arquitectura del proyecto se dividió en dos capas bien diferenciadas: el **frontend** en vanilla JavaScript, HTML y CSS, y el **backend** en Node.js con Express, comunicándose mediante una API REST.

En el frontend se adoptó un patrón de separación por responsabilidades, dividiendo el código en carpetas de `services` para las llamadas a la API, `js` para la lógica de cada vista, `lib` para utilidades compartidas como la URL base, y `css` organizado por componentes y páginas. Los estilos se scopearon por página usando CSS nesting para evitar conflictos al importar todos los archivos juntos.

En el backend se utilizó una arquitectura en capas con separación entre rutas, controladores y datos, siguiendo el patrón MVC. Los datos se almacenaron en archivos JSON en memoria, con rutas absolutas generadas con `path.join()` para garantizar compatibilidad independientemente del directorio de ejecución.

La configuración del entorno se estandarizó mediante **Biome** como linter y formateador, **Husky** para validar el código antes de cada commit, y **EditorConfig** junto con una configuración compartida de VSCode para garantizar consistencia entre todos los integrantes del equipo.

---

## Convención de commits

| Prefijo | Uso |
|---------|-----|
| `feat:` | Nueva funcionalidad |
| `fix:` | Corrección de bug |
| `docs:` | Cambios en documentación |
| `refactor:` | Reorganización de código |

---

## División de tareas

| Integrante | Tareas |
|------------|--------|
| **Iñaki** | Nueva página de login, nueva página de perfil de usuario, renderizado dinámico de servicios, equipo y perfil desde la API, búsqueda de servicios por input, despliegue de la API en Render, despliegue en GitHub Pages, documentación y arquitectura. |
| **Valentín** | Configuración de `app.js`, configuración de scripts en `package.json`, endpoint `POST /login`, carga de datos en `login.json` y `usuarios.json`, despliegue de la API en Render y despliegue en GitHub Pages. |
| **Alan** | Endpoint `GET /servicios`, endpoint `GET /servicios/:id` y carga de datos en `servicios.json`. |
| **Ezequiel** | Endpoint `GET /equipo` y carga de datos en `equipo.json`. |
| **Joaquín** | Endpoint `GET /perfil/:id`. |

---

## Funcionalidades

### Backend

| Feature | Descripción |
|---------|-------------|
| **Configuración del servidor** | El servidor se inicializa como una clase `Server` que registra middlewares, rutas y levanta la aplicación en el puerto definido por variable de entorno. |
| **Middlewares** | Se configuran CORS, parseo de JSON y servicio de archivos estáticos para las imágenes. |
| **Login** | Recibe email y contraseña, los valida contra `login.json` y devuelve los datos básicos del usuario si las credenciales son correctas. |
| **Equipo** | Devuelve todos los miembros del equipo almacenados en `equipo.json`. |
| **Perfil** | Busca un usuario por ID en `usuarios.json` y devuelve sus datos completos. |
| **Servicios** | Devuelve todos los servicios o uno específico por ID desde `servicios.json`. |
| **Archivos estáticos** | Las imágenes se sirven desde `docs/assets/images` bajo la ruta `/images`. |

**`Server`**

**`constructor()`:** Al instanciar la clase, crea la aplicación Express, define el puerto desde la variable de entorno `PORT` con fallback a `3000`, y llama a `middleware()` y `routes()` para configurarlos al iniciar.

```js
constructor() {
  this.app = express();
  this.port = process.env.PORT || 3000;
  this.middleware();
  this.routes();
}
```

**`middleware()`:** Registra tres middlewares globales. `cors()` permite que el frontend pueda hacer peticiones al backend desde un origen distinto. `express.json()` habilita el parseo automático del body en formato JSON para los requests POST. `express.static()` sirve las imágenes de `docs/assets/images` bajo la ruta `/images`, permitiendo que el frontend las consuma como archivos estáticos.

```js
middleware() {
  this.app.use(cors());
  this.app.use(express.json());
  this.app.use("/images", express.static("docs/assets/images"));
}
```

**`routes()`:** Registra las rutas de la API delegando cada endpoint a su archivo de rutas correspondiente. Al final registra dos middlewares de manejo de errores: uno para 404 y otro para 500. Ambos reciben cuatro parámetros `(err, req, res, next)`, lo que le indica a Express que son manejadores de error.

```js
routes() {
  this.app.use("/servicios", require("../routes/serviciosRoutes"));
  this.app.use("/equipo", require("../routes/equipoRoutes"));
  this.app.use("/perfil", require("../routes/perfilRoutes"));
  this.app.use("/login", require("../routes/authRoutes"));
  this.app.use((err, req, res, next) => {
    console.error(err.stack);
    return res.status(404).json({ msg: "Error. Pagina no encontrada" });
  });
  this.app.use((err, req, res, next) => {
    console.error(err.stack);
    return res.status(500).json({ msg: "Internal Server Error" });
  });
}
```

**`listen()`:** Levanta el servidor en el puerto configurado y muestra un mensaje en consola confirmando que está escuchando.

```js
listen() {
  this.app.listen(this.port, () => {
    console.log(`La API esta escuchando el el puerto: ${this.port}`);
  });
}
```

**`postLogin()`:** Lee el archivo `login.json` con una ruta absoluta generada por `path.join()`. Parsea el contenido a un array y desestructura el `email` y `password` del `req.body`. Busca con `.find()` un usuario que coincida con ambos campos simultáneamente. Si no lo encuentra devuelve un 401 con un mensaje de error. Si lo encuentra devuelve un 200 con el `id` y `email` del usuario, omitiendo la contraseña. Cualquier error inesperado devuelve un 500.

```js
const postLogin = async (req, res) => {
  try {
    const data = await fs.readFile(
      path.join(__dirname, "../data/login.json"),
      "utf-8",
    );
    const users = JSON.parse(data);
    const { email, password } = req.body;
    const userFound = users.find(
      (user) => user.email === email && user.password === password,
    );
    if (!userFound) {
      return res
        .status(401)
        .json({ error: "No se encontraron usuarios con esas credenciales" });
    }
    return res.status(200).json({
      msg: "Login exitoso",
      user: { id: userFound.id, email: userFound.email },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: `error ${error}` });
  }
};
```

**`getEquipo()`:** Construye la ruta absoluta al archivo `equipo.json` usando `path.join()`. Lee el archivo de forma asíncrona y parsea su contenido a un array. Si la operación es exitosa devuelve un 200 con todos los miembros del equipo. Si ocurre un error devuelve un 500 con un mensaje descriptivo.

```js
const getEquipo = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "../data/equipo.json");
    const data = await fs.readFile(filePath, "utf-8");
    const equipo = JSON.parse(data);
    console.log("GET /equipo - Datos enviados correctamente");
    res.status(200).json(equipo);
  } catch (error) {
    console.error("Error al leer equipo.json:", error);
    res.status(500).json({ error: "Error al obtener los datos del equipo" });
  }
};
```

**`getPerfilById()`:** Extrae el `id` de `req.params` y construye la ruta absoluta a `usuarios.json` usando `path.join()`. Lee y parsea el archivo, luego busca con `.find()` el usuario cuyo `id` coincida, convirtiendo el parámetro a número con `Number()` por si llegaran como string. Si no lo encuentra devuelve un 404. Si lo encuentra devuelve un 200 con todos los datos del usuario. Cualquier error inesperado devuelve un 500.

```js
const getPerfilById = async (req, res, _next) => {
  const { id } = req.params;
  try {
    const pathData = path.join(__dirname, "../data/usuarios.json");
    const data = await fs.readFile(pathData, "utf-8");
    const usuarios = JSON.parse(data);
    const usuario = usuarios.find((u) => u.id === Number(id));
    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    return res.status(200).json(usuario);
  } catch (error) {
    console.log(error);
    return res.status(500).JSON({
      error: "No se pudo obtener usuario",
    });
  }
};
```

**`getServicios()`:** Construye la ruta absoluta a `servicios.json` usando `path.join()`. Lee y parsea el archivo y devuelve un 200 con todos los servicios. Si ocurre un error devuelve un 500.

```js
const getServicios = async (req, res) => {
  try {
    const dataPath = path.join(__dirname, "../data/servicios.json");
    const data = await fs.readFile(dataPath, "utf-8");
    const servicios = JSON.parse(data);
    res.status(200).json(servicios);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al obtener servicios",
    });
  }
};
```

**`getServicioById()`:** Extrae el `id` de `req.params` y construye la ruta absoluta a `servicios.json`. Lee y parsea el archivo, luego busca con `.find()` el servicio cuyo `id` coincida, convirtiendo el parámetro a número con `Number()`. Si no lo encuentra devuelve un 404. Si lo encuentra devuelve un 200 con los datos del servicio. Cualquier error inesperado devuelve un 500.

```js
const getServicioById = async (req, res) => {
  try {
    const { id } = req.params;
    const dataPath = path.join(__dirname, "../data/servicios.json");
    const data = await fs.readFile(dataPath, "utf-8");
    const servicios = JSON.parse(data);
    const servicio = servicios.find((servicio) => servicio.id === Number(id));
    if (!servicio) {
      return res.status(404).json({
        msg: "Servicio no encontrado",
      });
    }
    res.status(200).json(servicio);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al obtener servicio",
    });
  }
};
```

### Frontend

| Feature | Descripción |
|---------|-------------|
| **Autenticación** | El usuario puede iniciar sesión con email y contraseña. Si las credenciales son incorrectas, se muestra un mensaje de error en el formulario. Al autenticarse correctamente, los datos del usuario se guardan en `sessionStorage`. |
| **Búsqueda en tiempo real** | El input de búsqueda en la página de servicios filtra las cards a medida que el usuario escribe, sin realizar peticiones adicionales al servidor. |
| **Renderizado dinámico** | Las cards de servicios, el equipo y el perfil se generan desde los datos de la API, sin escribir HTML manual para cada elemento. |
| **Perfil de usuario** | Al ingresar a la página de perfil, se recupera el usuario desde `sessionStorage` y se consulta la API para mostrar sus datos personales e historial de pedidos. |
| **Cierre de sesión** | El botón de cerrar sesión limpia el `sessionStorage` y redirige al usuario a la página de login. |
| **Protección de rutas** | Las páginas que requieren autenticación verifican la existencia del usuario en `sessionStorage` al cargarse. Si no existe, redirigen automáticamente al login. |

**`login()`:** Realiza un POST a `/login` con el `email` y `password` serializados en el body como JSON. Si la respuesta no es exitosa lanza un error con el mensaje que devuelve el servidor. Si es exitosa retorna los datos del usuario.

```js
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
```

**`js/login.js`:** Selecciona el formulario y el elemento de error al cargar la página. Al hacer submit previene el comportamiento por defecto y oculta cualquier error previo. Llama a `login()` con las credenciales del formulario. Si es exitoso guarda el usuario en `sessionStorage` y redirige al inicio. Si falla muestra el mensaje de error devuelto por el servidor en el formulario.

```js
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
    sessionStorage.setItem("user", JSON.stringify(data.user));
    window.location.href = "../index.html";
  } catch (error) {
    errorMsg.style.display = "block";
    errorMsg.textContent = error.message;
    console.error(error.message);
  }
});
```

**`getServices()`:** Realiza un GET a `/servicios`. Si la respuesta no es exitosa lanza un error con el status del servidor. Si es exitosa parsea y retorna el array de servicios.

```js
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
```

**`render()`:** Recibe un array de servicios y genera el HTML de cada card usando un template string, construyendo la URL de la imagen concatenando `URL_PREFIX` con la ruta relativa del servidor. Reemplaza el contenido del contenedor con el resultado.

```js
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
```

**`renderServices()`:** Obtiene todos los servicios y llama a `render()` para mostrarlos. Luego registra un evento `input` sobre el buscador que filtra el array original en memoria con `.filter()` comparando el nombre en minúsculas con la query, y llama a `render()` con el resultado. Si ocurre un error muestra un mensaje en el contenedor.

```js
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
```

**`getTeam()`:** Realiza un GET a `/equipo`. Si la respuesta no es exitosa lanza un error con el status del servidor. Si es exitosa parsea y retorna el array de miembros del equipo.

```js
export async function getTeam() {
  try {
    const response = await fetch(`${URL_PREFIX}/equipo`)
    if (!response.ok) {
      throw new Error(`Error fetching team: ${response.statusText}`)
    }
    const team = await response.json()
    return team
  } catch (error) {
    console.error('Error fetching team:', error)
    throw error
  }
}
```

**`renderTeam()`:** Obtiene todos los miembros del equipo y genera el HTML de cada card usando un template string, construyendo la URL de la foto concatenando `URL_PREFIX` con la ruta relativa del servidor. Reemplaza el contenido del contenedor con el resultado. Si ocurre un error muestra un mensaje en el contenedor.

```js
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
```

**`getProfile()`:** Recibe el `id` del usuario y realiza un GET a `/perfil/:id`. Si la respuesta no es exitosa lanza un error con el status del servidor. Si es exitosa parsea y retorna el objeto con los datos del perfil.

```js
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
```

**`renderProfile()`:** Recupera el usuario desde `sessionStorage`. Si no existe redirige al login. Si existe llama a `getProfile()` con su `id` y genera todo el HTML del perfil en un único template string, incluyendo la foto, datos personales y el listado de pedidos iterando sobre `profile.pedidos` con `.map()`. Una vez insertado el HTML en el DOM, selecciona el botón de logout y le asigna un evento `click` que limpia el `sessionStorage` y redirige al login. Si ocurre un error lo registra en consola.

```js
async function renderProfile() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const container = document.querySelector(".profile-container");

  if (!user) {
    window.location.href = "../pages/login.html";
    return;
  }

  try {
    const profile = await getProfile(user.id);

    container.innerHTML = `...`;

    const logoutButton = container.querySelector(".logout-button");

    logoutButton.addEventListener("click", () => {
      sessionStorage.removeItem("user");
      window.location.href = "../pages/login.html";
    });
  } catch (error) {
    console.error("Error loading profile:", error);
  }
}
```
---

## Estructura archivos JSON

**Equipo**
```json
{
  "id": 1,
  "nombre": "Julian Vance",
  "rol": "Curador Principal y Fundador",
  "foto": "/images/about-us-2.png",
  "descripcion": "Julian supervisa la integridad arquitectónica de nuestros flujos de trabajo de servicio,
  garantizando que cada interacción con el cliente cumpla con nuestro estándar característico de precisión."
}
```

**Login**
```json
{
  "id": 1,
  "email": "a.vanguard@curatorial.com",
  "password": "123"
}
```

**Servicios**
```json
{
  "id": 1,
  "nombre": "Auditoría Espacial",
  "precio": 2400,
  "descripcion": "Análisis riguroso para optimizar el rendimiento del espacio.",
  "imagen": "/images/service-1.png"
}
```

**Usuarios**
```json
{
  "id": 1,
  "nombre": "Alexander Vanguard",
  "email": "a.vanguard@curatorial.com",
  "rol": "CUENTA PERSONAL DEL CURADOR",
  "fechaRegistro": "Octubre 14 - 2023",
  "nivelCuenta": "Nivel Elite de Servicio",
  "telefono": "+34 123 456 789",
  "empresa": "Curatorial Service Architecture",
  "imagenPerfil": "/images/profile-1.png",
  "pedidos": [
    {
      "id": 1,
      "imagen": "/images/service-1.png",
      "nombre": "Auditoría Espacial",
      "fecha": "Marzo 12 - 2024"
    }
  ]
}
```

---

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js
- Biome
- Husky
- Git

## Herramientas utilizadas

- GitHub
- Google Stitch
- Google Fonts
- Render
- GitHub Pages

---
