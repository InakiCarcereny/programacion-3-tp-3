const fs = require("fs").promises;
const path = require("path");

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

module.exports = { postLogin };
