const User = require ("../models/User")
const bcrypt = require ("bcryptjs")
const jwt = require ("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

// Gerar token do usuario
const generateToken = (id) => {
    return jwt.sign ({id}, jwtSecret,{
        expiresIn: "7d"
    });
};

//Registar usuario e sign in
const register = async (req,res) =>{
    //saida no postman
    res.send ("Registroo")
}

// Disponibilizar funçoes para rotas. Imporar arquivo de rotas de forma simples. Exporta como Objeto -{}
module.exports= {
    register,
};