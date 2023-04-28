const router = require("express").Router()
const PhotoController = require("../controllers/photoController")

router.get("/", PhotoController.getPhotos)
router.get("/:id", PhotoController.getPhotoById)
router.post("/create", PhotoController.createPhoto)
router.put("/:id", PhotoController.updateOnePhotoById)
router.delete("/:id", PhotoController.deleteOnePhotoById)
module.exports = router;