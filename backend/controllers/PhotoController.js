const Photo = require("../models/Photo");
const mongoose = require("mongoose");
const User = require("../models/User");
//inserir foto com usuario e relacionar 
const insertPhoto = async (req, res) => {
    //titulo vem da requisiçao
    const {title} = req.body;
    const image = req.file.filename;
    console.log(req.body);
    //res.send ("Fotos foi Inserida.")
    const reqUser = req.user;
    const user = await User.findById(reqUser._id);
    console.log (user.name)
    //Criar foto
    const newPhoto = await Photo.create({
        image,
        title,
        userId: user.id,
        userName: user.name,
    });


    //se foi sucessfully, return data
    if(!newPhoto){
        res.status(422).json({
            errors:["houve um erro, por favor tente novamente mais tarde."],
        });
        return;
    }

    res.status(201).json(newPhoto);
    
};

//remover do DB
const deletePhoto = async (req, res) =>{
    const{id} = req.params;

    const reqUser = req.user;

    const photo = await Photo.findById(mongoose.Types.ObjectId(id));


    //checar se foto existe
    if(!photo){
        res.status(404).json({errors:["Foto não encontrada!"]})
    }

    //checar se foto pertence ao usuario
    if (!photo.userId.equals(reqUser._id)){
        res
            .status(422)
            .json({errors: ["Ocorreu um errom tente novamente mais tarde"]});
        return;
    }

    await Photo.findByIdAndDelete(photo._id);


    res
        .status(200)
        .json({id:photo._id, message:"Foto excluida com sucesso."});
};

//Pegar todas as fotos
const getAllPhotos = async (req, res) => {
    const photos = await Photo.find({})
    .sort([["createdAt", 1]])
    .exec();


    return res.status(200).json(photos);
};



// Pegar user fotos
const getUserPhotos = async (req, res) => {
    const {id} = req.params;

    const photos = await Photo.find({userId: id})
        .sort([["createdAt", 1]])
        .exec();

    return res.status(200).json(photos);
};

//Get foto por id
const getPhotoById = async (req, res) => {
    const {id} = req.params;


    const photo = await Photo.findById(mongoose.Types.ObjectId(id));


    //checar se existe

    if(!photo) {
        res.status(404).json({errors: [ "Foto não encontrada!"]});
        return;
    }

    res.status(200).json(photo);
};

//Update foto

const updatePhoto = async (req, res) =>{
    const {id} = req.params;
    const {title} = req.body;


    let image;

    if (req.file) {
        image = req.file.filename;
    }


    const reqUser = req.user;


    const photo = await Photo.findById(id);

    //Checar se existe

    if(!photo) {
        res.status(404).json ({errors: ["Foto não encontrada!"]});
        return;
    }


    //Checar se foto pertence a user

    if (!photo.userId.equals(reqUser._id)){
        res
        .status(422)
        .json({errors: [ "Ocorreu um erro, tente novamente mais tarde"]});
    return;
    }


    if (title) {
        photo.title = title;
    }


    if(image){
        photo.image = image;
    }


    await photo.save();


    res.status(200).json ({ photo, message: "Foto atualizada com sucesso!"});

};


// funçao like
const likePhoto = async (req, res) => {
    const {id} = req.params;

    const reqUser = req.user;

    const photo = await Photo.findById(id);


    //check if photo exists
    if(!photo) {
        res.status(404).json({ errors: [ "Foto não encontrada!"]});
        return;
    }


    //checar se usuario ja liked photo
    if (photo.likes.includes(reqUser._id)){
        res.status(422).json({ errors: ["Voce já curtiu esta foto."]});
        return;
    }


    //Colocar user id no array de likes

    photo.likes.push(reqUser._id);

    await photo.save();

    res
        .status(200)
        .json({photoId: id, userId: reqUser._id, message: "Agoto foi curtida!"});

};

// funçao comentario
const commentPhoto = async (req, res) => {
    const {id} = req.params;
    const{ comment } = req.body;

    const reqUser = req.user;
    const user = await User.findById(reqUser._id);
    const photo = await Photo.findById(id);

    //checar se existe
    if (!photo) {
        res.status(404).json({errors: ["Foto não encontrada!"]});
        return;
    }

    //colcoar comentario no array de comentarios

    const userComment = {
        comment,
        userName: user.name,
        UserImage: user.profileImage,
        userId: user._id,
    };

    photo.comment.push(userComment);
    
    await photo.save();

    res.status(200).json({
        comment: userComment,
        message: "Comentário adicionado com sucesso!",
    });
};

//Search a photo by title

const searchPhotos = async (req, res) =>{
    const{q} = req.query;

    const photos = await Photo.find ({title: new RegExp(q,"i")}).exec();

    res.status(200).json(photos);
};


module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
    getPhotoById,
    updatePhoto,
    likePhoto,
    commentPhoto,
    searchPhotos,
};




