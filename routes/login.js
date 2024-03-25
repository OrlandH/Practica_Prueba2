const express = require("express");
const User = require("../schema/user");
const { jsonResponse } = require("../lib/jsonResponse");
const getUserInfo = require("../lib/getUserInfo");
const router = express.Router();

router.post("/", async function (req, res, next) {
  const { username, password, } = req.body;

  if (!!!username || !!!password){
    return res.status(400).json(
        jsonResponse(400, {
            error: "Llena todos los campos",
        })
    );
  }

  try {
    let user = new User();
    const userExists = await user.usernameExists(username);

    if (userExists) {
      user = await User.findOne({ username: username });

      const passwordCorrect = await user.isCorrectPassword(
        password,
        user.password
      );

      if (passwordCorrect) {
        const accessToken = user.createAccessToken();
        const refreshToken = await user.createRefreshToken();

        console.log({ accessToken, refreshToken });

        return res.json(
          jsonResponse(200, {
            accessToken,
            refreshToken,
            user: getUserInfo(user),
          })
        );
      } else {
        return res.status(401).json(
          jsonResponse(401, {
            error: "Nombre de Usuario o Contraseña Incorrecta",
          })
        );
      }
    } else {
      return res.status(401).json(
        jsonResponse(401, {
          error: "No existe ese Usuario",
        })
      );
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
