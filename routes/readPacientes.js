const express = require("express");
const router = express.Router();
const pacien = require("../schema/paciente")
router.get("/", async (req, res) => {
  try {
    const { idUser } = req.user; // id del usuario desde el objeto req.user
    const pacientes = await Paciente.find({ idUser, ciudad: "Quito" });
    res.status(200).json(pacientes);
  } catch (error) {
    console.error("Error al obtener pacientes:", error);
    res.status(500).json({ error: "Error al obtener pacientes" });
  }
});

module.exports = router;
