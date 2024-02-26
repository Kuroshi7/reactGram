const mongoose = require ("mongoose")
const {Schema} = mongoose

//timestamps? true- para configuraçao do model, 2 campos serao criados update e create data.
//quando usuario criado ou atualizado ele ajusta o valor dos campos.

const userSchema= new Schema ({
    name: String,
    email: String,
    password: String,
    profileImage: String,
    bio: String
},
{
    timestamps: true
})

const User = mongoose.model ("User", userSchema);
module.exports = User;