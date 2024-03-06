const User = require("../models/User");

const jwt = require ("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const authGuard = async (req, res , next) => {
    // o item vai vir do postman - authorization
    const authHeader = req.headers ["authorization"];
    // o token virá sempre com o formato:
    //Bearer TOKEN do Postman. vamos pegar a segunda parte, o TOKEN.
    const token = authHeader && authHeader.split(" ") [1];

    //checar se header tem um token
    if (!token) return res.status(401).json({ errors: ["Acesso negado!"]});

    //check if token is valid
    try{
        const verified = jwt.verify(token, jwtSecret);

        //vamos preparar o objeto user para ser passado para outras paginas ou funçoes.
        // evita de ficar indo no banco de dados.
        //obtemos o objeto e tiramos a senha (menos-password) para nao trafegar entre as paginas.
        req.user = await User.findById(verified.id).select("-password");
        
        next();
        } catch (err) {
        res.status(400).json({errors: [ "O token é inválido!"] });
    }
};

module.exports = authGuard;