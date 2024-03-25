const Mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("../auth/sign");
const getUserInfo = require("../lib/getUserInfo");
const Token = require("./token");

const UserSchema = new Mongoose.Schema({
  id: { type: Object },
  idUser: {type: String, required: true},
  username: { type: String, required: true},
  apellido: { type: String, required: true },
  cedula: { type: String, required: true, unique: true },
  fechaNac: { type: String, required: true },
  genero: { type: String, required: true },
  ciudad: { type: String, required: true },
  direccion: { type: String, required: true },
  telefono: { type: String, required: true },
  email: { type: String, required: true },
});



UserSchema.methods.usernameExists = async function (cedula) {
  const result = await Mongoose.model("Pacien").find({ cedula: cedula });
  return result.length > 0;
};

UserSchema.methods.isCorrectPassword = async function (password, hash) {
  console.log(password, hash);
  const same = await bcrypt.compare(password, hash);

  return same;
};

UserSchema.methods.createAccessToken = function () {
  return generateAccessToken(getUserInfo(this));
};

UserSchema.methods.createRefreshToken = async function (next) {
  const refreshToken = generateRefreshToken(getUserInfo(this));

  console.error("refreshToken", refreshToken);

  try {
    await new Token({ token: refreshToken }).save();
    console.log("Token saved", refreshToken);
    return refreshToken;
  } catch (error) {
    console.error(error);
    next(new Error("Error creating token"));
  }
};

module.exports = Mongoose.model("Pacien", UserSchema);
