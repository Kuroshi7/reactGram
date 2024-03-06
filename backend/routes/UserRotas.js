
const express = require ("express");
const router = express.Router();
//importando funçoes controller
const {register, login, getCurrentUser, update} = require("../controllers/UseController");

//middlewares
const validate = require ("../middleware/HandleValidation");

//proximo
const {   userCreateValidation, loginValidation, userUpdateValidation } = require ("../middleware/userValidacao");

const authGuard = require ("../middleware/authGuard");
const {imageUpload} = require ("../middleware/imageUpload")


//routes

router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser);
router.put("/", authGuard, userUpdateValidation(), validate, imageUpload.single("profiImage"), update);


module.exports = router;