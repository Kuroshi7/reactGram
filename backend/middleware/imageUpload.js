//callback funçoes. Multer para upload de arquivos
const multer = require("multer");
//auxiliara nos diretorios para upload do arquivo. Metodos e funçoes para manipular diretorios
const path = require("path");

//destino para guardar imagem
//local onde vai ser salva. mudar destino padrão.
const imageStorage = multer.diskStorage({
    destination: function (req, file, cb){
        let folder = "";
        //se vier de uma URL que contem users, salva na pasta users.
        if (req.baseUrl.includes("users")){
            folder = "users";
        } else if (req.baseUrl.includes("photos")){
            folder = "photos";
        }
        //configura o destino da imagem.
        cb(null, `uploads/${folder}/`);
    },
    //ajustar o nome do arquivo da imagem com a data de hoje.
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// validar a imagem e onde ela vai ser instalada.
const imageUpload = multer ({
    storage: imageStorage,
    // validar a extensao do arquivo com expressao regular.
    fileFilter(req, file, cb){
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            //upload apenas formato png e jpg
            return cb (new Error("Por Favor, envie apenas png ou jpg!"));
        }
        cb(undefined, true);
    },
});

module.exports = {imageUpload};