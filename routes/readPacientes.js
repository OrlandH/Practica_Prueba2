const express = require("express");
const router = express.Router();
const listarPacientes = require('../controller/pacienteController')

router.get("/listarPacientes",listarPacientes)



module.exports = router;
