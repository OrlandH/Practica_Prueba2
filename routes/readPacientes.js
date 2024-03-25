const express = require("express");
const router = express.Router();
const paciente = require('../schema/paciente')

router.get("/", async (req, res) => {
    try {
      const items = await paciente.find({ idUser: req.user.id });
      return res.json(items);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Error al obtener los todos" });
    }
  });



module.exports = router;
