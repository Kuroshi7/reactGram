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
    const {name, email, password} = req.body;

    //check if user exists
    const user = await User.findOne({email});

    if (user){
        res.status(422). json ({ errors: ["Por favor, utilize outro e-mail."]});
        return;
    }

    //gerar password hash
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    //criar usuario
    const newUser = await User.create({
        name,
        email,
        password: passwordHash,
    });

    //if User was created sucessfully, return the token
    if (!newUser){
        res.status(422).json({
            errors: ["Houve um erro, por favor tente novamente mais tarde."],
        });
        return;
    }
    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id),
    });
    
}

//Sing user in
    const login = async (req,res) => {
        const {emial, password } = req.body;

        const user = await User.findOne({ email });

        //checar se usuario existe
        if (!user) {
            res.status(404).json({ errors: ["Usuario não encontrado!"]});
            return;
        }
// checar se senha match
        if (!(await bcrypt.compare(password, user.password))) {
            res.status(422).json ({ errors: ["Senha invalida!"]});
            return;
        }
        //retornar usuario com token
        res.status(200).json({
            _id: user.id,
            profileImage: user.profileImage,
            token: generateToken (user._id),
        });
    };
// Get logged in user
    const getCurrentUser = async (req, res) => {
        const user = req.user;
        res.status (200).json(user);
    };

// Disponibilizar funçoes para rotas. Imporar arquivo de rotas de forma simples. Exporta como Objeto -{}
module.exports= {
    register,
    login,
    getCurrentUser
};