const express = require("express");
const router = express.Router();
const Pacien = require("../schema/paciente");

router.get("/", async (req, res) => {
    try {
      const items = await Pacien.find({ idUser: req.user.id });
      return res.json(items);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Error al obtener los todos" });
    }
  });



module.exports = router;
