const express=require('express');
const Joi=require('joi');
const app=express.Router();
const mongoose=require('mongoose');
const {GenereSchema,Genere}=require('../models/genere');
const auth=require('../middleware/auth');
const Users=require('../models/user');
const admin=require('../middleware/admin');

app.get('/',async (req,res)=>{
    const genere=await Genere.find().sort({name:1});
    res.send(genere);
});

app.get('/:id',async (req,res)=>{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send('Id is invalid');
        const genere=await Genere.findById(req.params.id);
        if(!genere) return res.status(404).send(`This id does'nt exist.`);
        res.send(genere);
});

app.post('/',auth,async (req,res)=>{
    
     const result=validategenere(req.body);
     if(result.error) return res.status(400).send(result.error);
        
     let genere=new Genere({
         name:req.body.name   
     });
     await genere.save()
     res.send(genere);

});

app.put('/:id',auth,async (req,res)=>{

    if(!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send('Please Enter a valid object id');

    const result=validategenere(req.body);
    if(result.error) return res.status(400).send(result.error);

    const genre = await Genere.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name },
        {
          new: true
        }
      );
    
      if (!genre)
        return res.status(404).send("The genre with the given ID was not found.");
    
      res.send(genre);
});

app.delete('/:id',[auth,admin],async (req,res)=>{
    const isValid=mongoose.Types.ObjectId.isValid(req.params.id);
    if(!isValid)
    return res.status(400).send("the given ID is invalid.");

    const genre = await Genere.findByIdAndRemove(req.params.id);

    if (!genre)
      return res.status(404).send("The genre with the given ID was not found.");
  
    res.send(genre);
    
});

function validategenere(genere){
    const schema={
        name:Joi.string().required()
    };
    return Joi.validate(genere,schema);
}

module.exports=app;