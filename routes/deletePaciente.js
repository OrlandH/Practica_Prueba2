const express = require("express");
const User = require("../schema/user");
const { jsonResponse } = require("../lib/jsonResponse");
const getUserInfo = require("../lib/getUserInfo");
const router = express.Router();

// Endpoint para eliminar un paciente por su ID
router.delete("/:id", async function (req, res, next) {
  try {
    const userId = req.params.id; 
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json(
        jsonResponse(404, {
          error: "El paciente no existe",
        })
      );
    }
    await User.findByIdAndDelete(userId);
    return res.json(
      jsonResponse(200, {
        message: "Paciente eliminado exitosamente",
      })
    );
  } catch (err) {
    console.error("Error al eliminar paciente:", err);
    return res.status(500).json(
      jsonResponse(500, {
        error: "Error al eliminar paciente",
      })
    );
  }
});

module.exports = router;
