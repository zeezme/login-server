const db = require("../models")
const jwt = require("jsonwebtoken")
const config = require("../config/jwt.config.js")
const User = db.user

checkBaseInfo = (req, res, next) => {
  if (!req.body.email) {
    res.status(400).send({
      message: "Email is required!",
    })
    return
  }

  next()
}

checkUserExists = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (!user) {
      return res.status(404).send({
        message: "User not found!",
      })
    }
    next()
  })
}

checkRoleAdmin = (req, res, next) => {
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
        message: "Unauthorized!",
      })
    }
    User.findOne({
      where: {
        email: decoded.user.email,
      },
    }).then((user) => {
      console.log(user)
      if (!user) {
        return res.status(403).send({
          message: "User not found!",
        })
      }
      if (user.role !== "admin") {
        return res.status(403).send({
          message: "Unauthorized!",
        })
      }

      next()
    })
  })
}

const verifySignUp = {
  checkBaseInfo,
  checkRoleAdmin,
  checkUserExists,
}

module.exports = verifySignUp
