const { Router } = require("express");
const router = Router();
const { postLogin } = require("../controllers/authController");



router.post("/", postLogin);

module.exports = router;

