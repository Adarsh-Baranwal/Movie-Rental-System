import React from "react";
import Joi from "joi-browser";
import Form from "./common/Form";
import { register } from "../services/userService";
import { loginwithjwt } from "../services/authService";

class Register extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: "",
    },
    error: {},
  };
  schema = {
    username: Joi.string().email().required(),
    password: Joi.string().required().min(5),
    name: Joi.string().required(),
  };
  dosubmit = async () => {
    try {
      const response = await register(this.state.data);
      loginwithjwt(response.headers["x-jwt"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const error = this.state.error;
        error.username = ex.response.data;
        this.setState({ error });
      }
    }
  };
  render() {
    return (
      <React.Fragment>
        <div className="loginform">
          <h1>Register</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("username", "UserName", "email")}
            {this.renderInput("password", "Password", "password")}
            {this.renderInput("name", "Name")}
            {this.renderButton("Register")}
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;
