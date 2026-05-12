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
			msg: "Error al obtener servicios"
		});
	}
};

module.exports = {
	getServicios
};