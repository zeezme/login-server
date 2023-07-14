const db = require("../models")
const ROLES = db.role
const User = db.user

checkBaseInfo = (req, res, next) => {
  if (!req.body.email) {
    res.status(400).send({
      message: "Email is required!",
    })
    return
  }

  if (!req.body.password) {
    res.status(400).send({
      message: "Password is required!",
    })
    return
  }

  next()
}

checkValidInfo = (req, res, next) => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
    res.status(400).send({
      message: "Email is not valid!",
    })
    return
  }

  /* 
  Pelo menos 8 caracteres de comprimento ({8,})
  Contém pelo menos uma letra minúscula ((?=.*[a-z]))
  Contém pelo menos uma letra maiúscula ((?=.*[A-Z]))
  Contém pelo menos um dígito ((?=.*\d))
  Contém pelo menos um caractere especial do conjunto @$!%*?& ((?=.*[@$!%*?&]))
   */

  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      req.body.password
    )
  ) {
    res.status(400).send({
      message: "Password is not valid!",
    })
    return
  }
  next()
}

const verifySignUp = {
  checkBaseInfo,
  checkValidInfo,
}

module.exports = verifySignUp
