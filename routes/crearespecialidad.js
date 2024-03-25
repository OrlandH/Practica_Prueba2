const express = require("express");
const Espe = require("../schema/especialidad");
const { jsonResponse } = require("../lib/jsonResponse");
const router = express.Router();

router.post("/", async function (req, res, next) {
  const { codigo, nombre, descripcion} = req.body;

  if (!codigo || !nombre || !descripcion ) {
    return res.status(409).json(
      jsonResponse(409, {
        error: "Llena todos los campos",
      })
    );
  }

  try {
    const user = new Espe();
    const userExists = await user.usernameExists(codigo);

    if (userExists) {
      return res.status(409).json(
        jsonResponse(409, {
          error: "Este codigo de especialidad ya esta registrada",
        })
      );
    } else {
      const user = new Espe({codigo, nombre, descripcion});

      user.save();

      res.json(
        jsonResponse(200, {
          message: "Especialidad creado exitosamente",
        })
      );
    }
  } catch (err) {
    return res.status(500).json(
      jsonResponse(500, {
        error: "Error creando Especialidad",
      })
    );
  }
});

module.exports = router;