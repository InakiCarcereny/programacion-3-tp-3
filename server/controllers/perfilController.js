const path = require("node:path");
const fs = require("node:fs").promises;

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

module.exports = { getPerfilById };
