
const express = require ("express")
const router = express.Router()

// Controller
const{
    register,} = require ("../controllers/UseController");

//middlewares
const validate = require ("../middleware/HandleValidation");

//proximo
const {
    userCreateValidation, } = require ("../middleware/HandleValidation");


//routes

router.post("/register",register);


module.exports = router;