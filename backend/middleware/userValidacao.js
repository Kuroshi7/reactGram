const {body} = require ("express-validator");

const userCreateValidation = () => {
    console.log ("Funcao userCreateValidation executada.")
    return [
    body("name")
        .isString()
        .withMessage("o nome é obrigatorio.")
        .isLength ({min: 3})
        .withMessage("o nome precisa ter no minimo 3 caracteres."),
    body("email")
        .isString()
        .withMessage("o e-mail é obrigatiorio.")
        .isEmail()
        .withMessage("insira um e-mail válido"),
    body("password")
        .isString()
        .withMessage("A senha é obrigatoria.")
        .isLength({min : 5})
        .withMessage("A senha precisa de no minimo 5 caracteres."),
    body("confirmPassword")
        .isString()
        .withMessage("A confirmaçao de senha é obrigatoria.")
        .custom ((value, {req}) =>{
            if (value != req.body.password){
                throw new Error ("As senhas nao sao iguais.")
            }
            return true
        }),    

    ];
};


const loginValidation = () => {
    return [
        body ("email")
        .isString ()
        .withMessage ( "O e-mail é obrigatorio.")
        .isEmail ()
        .withMessage ("Insira um e-mail válido"),
    body ("password") .isString() .withMessage ("A senha é obrigatoria."),

    ];
};

const userUpdateValidation = () => {
    return[
        body ("name")
        .optional()
        .isLength({ min: 3})
        .withMessage ("O nome precisa ter no minimo 3 caracteres."),
        body("password")
        .optional()
        .isLength({ min: 5})
        .withMessage ("A senha precisa de no minimo 5 caracteres.")
    ];
};

module.exports = {
    userCreateValidation,
    loginValidation,
    userUpdateValidation,
};