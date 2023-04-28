require("dotenv").config()

const express = require("express")
const app = express()
const PORT = process.env.PORT
const routers = require("./routers")
const env = process.env.NODE_ENV

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use("/", routers)

if (env !== "test") {
  app.listen(PORT, () => {
    console.log("App running on port: ", PORT);
  })
}

module.exports = app