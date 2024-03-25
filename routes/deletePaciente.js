const express = require("express");
const User = require("../schema/user");
const { jsonResponse } = require("../lib/jsonResponse");
const getUserInfo = require("../lib/getUserInfo");
const router = express.Router();

router.delete("/:cedula", async (req, res) => {
  try {
    const { cedula } = req.params;
    const user = await User.findOne({ cedula });
    if (!user) {
      return res.status(404).json(
        jsonResponse(404, {
          error: "El paciente no existe",
        })
      );
    }

    await User.findOneAndDelete({ cedula });
    return res.json(
      jsonResponse(200, {
        message: "Paciente eliminado exitosamente",
      })
    );
  } catch (error) {
    console.error("Error al eliminar paciente:", error);
    return res.status(500).json(
      jsonResponse(500, {
        error: "Error al eliminar paciente",
      })
    );
  }
});

module.exports = router;
