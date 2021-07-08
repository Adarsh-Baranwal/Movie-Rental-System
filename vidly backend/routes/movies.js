const express=require('express');
const Joi=require('joi');
const app=express.Router();
const mongoose=require('mongoose');
const Movies=require('../models/movies');
const {Genere}=require('../models/genere');
const auth=require('../middleware/auth');
const admin=require('../middleware/admin');
const moment=require('moment');

app.get('/',async (req,res)=>{
    const movies=await Movies.find().sort('title');
    res.send(movies);
})

app.get('/:id',async (req,res)=>{
       
        if(!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send(`This Id is Invalid.`);
        const movie=await Movies.findById(req.params.id);
        if(!movie) return res.status(404).send(`This Id does'nt Exist`);
        res.send(movie);
        
})

app.post('/',auth,async (req,res)=>{
    const result=validatemovie(req.body);
    if(result.error) return res.status(400).send(result.error.message);

    let genere=await Genere.findById(req.body.genereId);
    if(!genere) return res.status(404).send('Invalid Genere !!');
    
    let movie=new Movies({
        title:req.body.title,
        genere:{
            _id:genere._id,
            name:genere.name
        },
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate
    });
    await movie.save();
    res.send(movie);
})

app.put('/:id', auth,async (req, res) => {

    if(!mongoose.Types.ObjectId.isValid(req.params.id))
    res.status(400).send(`Given movie Id is Invalid`);

    const result=validatemovie(req.body);
    if(result.error) return res.status(400).send(result.error.message);
  
    let genere=await Genere.findById(req.body.genereId);
    if(!genere) return res.status(404).send('Invalid Genere !!');
  
    const movie = await Movies.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        genere: {
          _id: genere._id,
          name: genere.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
      },
      { new: true }
    );
  
    if (!movie)
      return res.status(404).send("The movie with the given ID was not found.");
  
    res.send(movie);
  });

app.delete('/:id',[auth,admin],async (req,res)=>{
    const isValid=mongoose.Types.ObjectId.isValid(req.params.id);
    if(!isValid)
    return res.status(400).send("the given ID is invalid.");

    const movie = await Movies.findByIdAndRemove(req.params.id);

    if (!movie)
      return res.status(404).send("The movie with the given ID was not found.");
  
    res.send(movie);
})

function validatemovie(movie){
    const schema={
        title:Joi.string().required(),
        genereId:Joi.objectId().required(),
        numberInStock:Joi.number().integer(),
        dailyRentalRate:Joi.number().integer()
    };
    return Joi.validate(movie,schema);
}

module.exports=app;