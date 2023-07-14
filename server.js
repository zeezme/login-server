require("dotenv").config()

const express = require("express")
const cors = require("cors")

const app = express()
const router = require("./app/routes/router")
const bodyParser = require("body-parser")

app.use(cors())

app.use(bodyParser.json())

app.use("/", router)

app.listen(99)
