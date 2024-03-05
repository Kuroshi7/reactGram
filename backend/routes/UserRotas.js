
const express = require ("express");
const router = express.Router();
//importando funçoes controller
const {register, login, getCurrentUser} = require("../controllers/UseController");

//middlewares
const validate = require ("../middleware/HandleValidation");

//proximo
const {   userCreateValidation, loginValidation } = require ("../middleware/userValidacao");




//routes

router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);



module.exports = router;