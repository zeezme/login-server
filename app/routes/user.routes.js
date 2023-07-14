const controller = require("../controllers/user.controller")
const { deleteUser } = require("../middleware/index")

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
    "/user/delete",
    [deleteUser.checkBaseInfo, deleteUser.checkRoleAdmin, checkUserExists],
    controller.delete
  )
  app.post("/user/verify-token", controller.verifyToken)
}
