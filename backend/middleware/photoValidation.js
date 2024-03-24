const {body} = require ("express-validator");
const photoInsertValidation = () => {
    return [
        body("title")
        //se nao igual indefinido, quando nao vem nenhum dado
        .not()
        .equals("undefined")
        .withMessage("O titulo é obrigatorio")
        .isString()
        .isLength({min: 3})
        .withMessage("O nome precisa ter no mínimo 3 caracteres."),
        //validaçao customizada.
        body("image").custom((value,{req})=>{
            if(!req.file){
                //testando recebimento de imagem
                throw new Error("A imagem é obrigatoria");
            }
            return true;
        }),
    ];
};

const photoUpdateValidation = () => {
    return [
        body ("image")
            .optional()
            .custom ((value,{req}) => {
                if (!req.file) {
                    throw new Error ("A imagem é obrigatoria");
                }
                return true;
            }),
        body ("title")
            .optional()
            .isString()
            .withMessage("o titulo é obrigatorio")
            .isLength({min:3})
            .withMessage("O nome precisa ter no minimo 3 caracteres."),
    ];
};

const commentValidation = () => {
    return [body("comment"). isString(). withMessage("O comentario é obrigatorio")];
};

module.exports = {
    photoInsertValidation,
    photoUpdateValidation,
    commentValidation,
}