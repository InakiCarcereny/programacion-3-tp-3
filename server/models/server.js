const express = require("express");
const cors = require("cors");
require("dotenv").config();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use("/images", express.static("client/assets/images"));
  }

  routes() {
    this.app.use("/servicios", require("../routes/serviciosRoutes"));
    this.app.use("/equipo", require("../routes/equipoRoutes"));
    this.app.use("/perfil", require("../routes/perfilRoutes"));
    //this.app.use("/perfil", require("../routes/perfilRoutes"));
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

  listen() {
    this.app.listen(this.port, () => {
      console.log(`La API esta escuchando el el puerto: ${this.port}`);
    });
  }
}

module.exports = Server;
