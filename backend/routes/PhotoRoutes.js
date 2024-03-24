const express = require ("express");
const router = express.Router();

//controller
const { insertPhoto, deletePhoto, getAllPhotos, getUserPhotos, searchPhotos, getPhotoById, updatePhoto, likePhoto, commentPhoto } = require ("../controllers/PhotoController");

//middlewares
const authGuard = require("../middleware/authGuard");
const validate = require ("../middleware/handleValidation")
const { photoInsertValidation, photoUpdateValidation, commentValidation,} = require ("../middleware/photoValidation");
const {imageUpload} = require("../middleware/imageUpload");

//routes
router.post("/", authGuard, imageUpload.single("image"), photoInsertValidation(), validate, insertPhoto);
router.delete("/:id", authGuard, deletePhoto);
router.get("/", getAllPhotos);
router.get("/user/:id", getUserPhotos);
router.get("/search", searchPhotos);
router.get("/:id", getPhotoById);
router.put("/:id", authGuard, imageUpload.single("image"), photoUpdateValidation(), validate, updatePhoto);
router.put("/like/:id", authGuard, likePhoto);
router.put("/comment/:id", authGuard, commentValidation(), validate, commentPhoto);

module.exports = router;