const express=require('express');
const Joi=require('joi');
const app=express.Router();
const mongoose=require('mongoose');
const Users=require('../models/user');
const _=require('lodash');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const config=require('config');

app.post('/',async (req,res)=>{
    const result=validateuser(req.body);
    if(result.error) return res.status(400).send(result.error.message);

    let user=await Users.findOne({email:req.body.email});
    if(!user) return res.status(400).send(`Invalid email or password!!!`);

    const validuser=await bcrypt.compare(req.body.password,user.password);
    if(!validuser) return res.status(400).send(`Invalid email or password`);
    
    //res.send(_.pick(user,['_id','name','email']));
    const token=user.generatetoken();

    res.send(token);
})

function validateuser(req)
{
    const schema={
        email:Joi.string().required().email(),
        password:Joi.string().min(5).max(255).required()
    };
    return Joi.validate(req,schema);
}

module.exports=app;