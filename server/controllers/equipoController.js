const fs = require("fs/promises");
const path = require("path");

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

module.exports = { getEquipo };
