const express = require("express");
const Joi = require("joi");
const app = express.Router();
const mongoose = require("mongoose");
const Users = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");

app.get("/me", auth, async (req, res) => {
  const user = await Users.findById(req.user.id).select("-password");
  res.send(user);
});

app.post("/", async (req, res) => {
  const result = validateuser(req.body);
  if (result.error) return res.status(400).send(result.error.message);

  let user = await Users.findOne({ email: req.body.email });
  if (user) return res.status(400).send(`User already exist`);

  user = new Users(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  token = user.generatetoken();

  res
    .header("x-jwt", token)
    .header("access-control-expose-headers", "x-jwt")
    .send(_.pick(user, ["_id", "name", "email"]));
  //res.send(user);
});

function validateuser(user) {
  const schema = {
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(5).max(255).required(),
  };
  return Joi.validate(user, schema);
}

module.exports = app;
