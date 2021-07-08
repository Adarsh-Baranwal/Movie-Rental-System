import React from "react";
import Joi from "joi-browser";
import Form from "./common/Form";
import { login } from "../services/authService";

class Login extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
    error: {},
  };
  schema = {
    username: Joi.string().required().label("UserName"),
    password: Joi.string().required().label("Password"),
  };

  dosubmit = async () => {
    try {
      await login(this.state.data.username, this.state.data.password);
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
          <h1>Login</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("username", "UserName")}
            {this.renderInput("password", "Password", "password")}

            {this.renderButton("Login")}
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
