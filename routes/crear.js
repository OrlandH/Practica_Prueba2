const express = require("express");
const Pacien = require("../schema/paciente");
const { jsonResponse } = require("../lib/jsonResponse");
const router = express.Router();

router.post("/", async function (req, res, next) {
  const { username, apellido, cedula, fechaNac, genero, ciudad, direccion, telefono, email } = req.body;

  if (!username || !apellido || !cedula || !fechaNac || !genero || !ciudad || !direccion || !telefono || !email) {
    return res.status(409).json(
      jsonResponse(409, {
        error: "Llena todos los campos",
      })
    );
  }

  try {
    const user = new Pacien();
    const userExists = await user.usernameExists(cedula);

    if (userExists) {
      return res.status(409).json(
        jsonResponse(409, {
          error: "Esa cedula ya esta registrada",
        })
      );
    } else {
      const user = new Pacien({ idUser: req.user.id, username, apellido, cedula, fechaNac, genero, ciudad, direccion, telefono, email });

      user.save();

      res.json(
        jsonResponse(200, {
          message: "Paciente creado exitosamente",
        })
      );
    }
  } catch (err) {
    return res.status(500).json(
      jsonResponse(500, {
        error: "Error creando Paciente",
      })
    );
  }
});

module.exports = router;