const controller = require("../controllers/auth.controller")
const { signup, signin } = require("../middleware/index")

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    )
    res.header("Access-Control-Allow-Origin", "*")
    next()
  })
  app.post(
    "/signup",
    [
      signup.checkBaseInfo,
      signup.checkDuplicateUsernameOrEmail,
      signup.checkValidInfo,
    ],
    controller.signup
  )
  app.post(
    "/signin",
    [signin.checkBaseInfo, signin.checkValidInfo],
    controller.signin
  )
}
