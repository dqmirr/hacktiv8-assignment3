const router = require("express").Router()
const photoRouters = require("./photoRouters")
const userRouters = require("./userRouters")
const authentication = require("../middlewares/authentication")

router.use("/users", userRouters)

router.use(authentication)
router.use("/photos", photoRouters)

module.exports = router