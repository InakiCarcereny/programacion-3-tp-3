const { Router } = require("express");

const { getServicios } = require("../controllers/serviciosController");

const router = Router();

router.get("/", getServicios);

module.exports = router;
