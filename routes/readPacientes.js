const express = require("express");
const router = express.Router();
const paciente = require("../schema/paciente");

router.get("/", async (req,res)=>{
  const pacientes = await paciente.find({ idUser }).where(ciudad, "Quito");
  res.status(200).json(pacientes);
})

module.exports = router;
