
const express = require ("express")
const router = express.Router()

//Funçoes UserController.js

const {register} = require ("../controllers/UseController");
router.post ("/register", register);
module.exports = router;