const { Router } = require("express");
const { getEquipo } = require("../controllers/equipoController");

const router = Router();

router.get("/", getEquipo);

module.exports = router;
