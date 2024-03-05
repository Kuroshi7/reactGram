
const express = require ("express");
const router = express.Router();

// Controller
const{
    register,} = require ("../controllers/UseController");

//middlewares
const validate = require ("../middleware/HandleValidation");

//proximo
const {   userCreateValidation, } = require ("../middleware/userValidacao");


//routes

router.post("/register", userCreateValidation(), validate, register);


module.exports = router;