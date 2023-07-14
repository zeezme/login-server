const db = require("../models")
const jwt = require("jsonwebtoken")
const config = require("../config/jwt.config.js")

var bcrypt = require("bcryptjs")

const User = db.user

exports.signup = (req, res) => {
  //Cria o usuário
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    //Nunca passar a role aqui, seria um problema de segurança.
  }).then((response) => {
    res.status(201).send({
      message: `User ${response.dataValues.username} registered successfully!`,
    })
  })
}

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (!user) {
      return res.status(404).send({
        message: "User not found.",
      })
    }
    //Compara se a senha vindo do body da req é igual a senha criptografada do banco.

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).send({
        message: "Invalid password.",
      })
    }

    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      connectionToken: jwt.sign({ user }, config.key, {
        expiresIn: 86400, //tempo
      }),
    })
  })
}
