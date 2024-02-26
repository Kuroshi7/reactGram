const mongoose = require("mongoose")
const{Schema} = mmongoose


const fotoSchema= new Schema ({
    image: String,
    title: String,
    likes: Array,
    comments: Array,
    userId: mongoose.ObjectId,
    userName: String

},
{
    timestamps : true

})

const Photo = mongoose.model ("Photo",fotoSchema);
module.exports = Photo;