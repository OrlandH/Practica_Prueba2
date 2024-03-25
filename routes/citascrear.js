const express = require("express");
const CitasR = require("../schema/citas");
const { jsonResponse } = require("../lib/jsonResponse");
const router = express.Router();

router.post("/", async function (req, res, next) {
  const { codigo, descripcion, id_paciente, id_especialidad} = req.body;

  if (!codigo || !id_paciente || !descripcion || !id_especialidad) {
    return res.status(409).json(
      jsonResponse(409, {
        error: "Llena todos los campos",
      })
    );
  }

  try {
    const user = new CitasR();
    const userExists = await user.usernameExists(codigo);

    if (userExists) {
      return res.status(409).json(
        jsonResponse(409, {
          error: "Este numero de cita ya esta registrada",
        })
      );
    } else {
      const user = new CitasR({codigo, descripcion, id_paciente, id_especialidad});

      user.save();

      res.json(
        jsonResponse(200, {
          message: "Cita creado exitosamente",
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