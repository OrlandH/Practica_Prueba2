const express = require("express");
const User = require("../schema/user");
const { jsonResponse } = require("../lib/jsonResponse");
const router = express.Router();

router.post("/", async function (req, res, next) {
  const { name, lastname, username, email,password} = req.body;

  if (!username || !password || !name || !lastname || !email) {
    return res.status(409).json(
      jsonResponse(409, {
        error: "Todos los campos son requeridos",
      })
    );
  }

  try {
    const user = new User();
    const userExists = await user.usernameExists(username);

    if (userExists) {
      return res.status(409).json(
        jsonResponse(409, {
          error: "Ya existe ese nombre de usuario",
        })
      );
    } else {
      const user = new User({ username, password, name,lastname,email });
      user.save();

      res.json(
        jsonResponse(200, {
          message: "Usuario creado exitosamente",
        })
      );
    }
  } catch (err) {
    return res.status(500).json(
      jsonResponse(500, {
        error: "Error creando usuario",
      })
    );
  }
});

module.exports = router;
