const db = require("../models")

const jwt = require("jsonwebtoken")
const config = require("../config/jwt.config.js")

const User = db.user

exports.delete = (req, res) => {
  User.destroy({
    where: {
      email: req.body.email,
    },
  }).then((response) => {
    console.log(response)
    res.status(201).send({
      message: "User removed!",
    })
  })
}
exports.verifyToken = (req, res) => {
  let token = req.headers["x-access-token"]
    ? req.headers["x-access-token"]
    : req.body.access_token

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    })
  }

  jwt.verify(token, config.key, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        token_status: "invalid",
        expiration: null,
      })
    }
    return res.status(200).send({
      token_status: "valid",
      expiration: decoded.exp,
    })
  })
}
