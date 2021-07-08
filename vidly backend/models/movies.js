const mongoose=require('mongoose');
const {GenereSchema}=require('./genere');

const MoviesSchema =new mongoose.Schema({
    title:String,
    genere:GenereSchema,
    numberInStock:Number,
    dailyRentalRate:Number
});
const Movies=mongoose.model('Movies',MoviesSchema);
module.exports=Movies;