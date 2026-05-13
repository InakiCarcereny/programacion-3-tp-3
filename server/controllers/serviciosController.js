const fs = require("node:fs/promises");
const path = require("node:path");

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

module.exports = {
  getServicios,
  getServicioById,
};
