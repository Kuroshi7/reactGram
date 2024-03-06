const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");


const jwtSecret = process.env.JWT_SECRET;

// Gerar token do usuario
const generateToken = (id) => {
    return jwt.sign ({id}, jwtSecret, {
        expiresIn: "7d",
    });
};

//Registar usuario e sign in
const register = async (req, res) => {
    const {name, email, password} = req.body;

    //check if user exists
    const user = await User.findOne({email});

    if (user){
        res.status(422).json ({ errors: ["Por favor, utilize outro e-mail."]});
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
    
};

//get logged in user
    const getCurrentUser = async (req, res) => {
        const user = req.user;

        res.status(200).json(user);
    };

//Sing user in
    const login = async (req,res) => {
        const {email, password } = req.body;

        const user = await User.findOne({email});

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
// update user
    const update = async (req, res) => {
        const {name, password, bio,} = req.body;

        let profileImage = null;
        
        if (req.file) {
            profileImage = req.file.filename;
        }

        const reqUser = req.user;

        const user = await User.findById(new mongoose.Types.ObjectId(reqUser._id)).select("-password");

        if (name) {
            user.name = name;
        }

        if (password) {
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);
            user.password = passwordHash;
        }

        if (profileImage) {
            user.profileImage = profileImage;
            
        }

        if (bio) {
            user.bio = bio;
        }

        await user.save();

        res.status(200).json(user);
    };

    //get user by id
    const getUserById = async (req, res) => {
        const {id} = req.params;

        const user = await User.findById( new mongoose.Types.ObjectId(id)).select(
            "-password"
        );

        if (!user) {
            res.status(404).json({ errors: ["Usuário não encontrado!"] });
            return;
        }

        res.status(200).json(user);
    };
   

// Disponibilizar funçoes para rotas. Imporar arquivo de rotas de forma simples. Exporta como Objeto -{}
module.exports= {
    register,
    login,
    getCurrentUser,
    getUserById,
    update

};