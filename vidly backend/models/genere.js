const mongoose= require("mongoose");

const GenereSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
});
const Genere=mongoose.model('Genere',GenereSchema);

module.exports.GenereSchema=GenereSchema;
module.exports.Genere=Genere;