const express = require("express");
const router = express.Router();
const paciente = require("../schema/paciente");

router.get("/", async (req, res) => {
  try {
    const pacientes = await paciente.find({
      idUser: req.user.id,
      ciudad: "Quito",
    });
    res.status(200).json(pacientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener pacientes" });
  }
});

module.exports = router;
