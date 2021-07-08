const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
    minlength: 5,
    maxlength: 1024,
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.generatetoken = function () {
  const token = jwt.sign(
    { id: this._id, name: this.name },
    config.get("jwtprivatekey")
  );
  return token;
};

const Users = mongoose.model("Users", UserSchema);
module.exports = Users;
