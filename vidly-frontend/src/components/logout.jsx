import { Component } from "react";
import { logout } from "../services/authService";

class LogOut extends Component {
  componentDidMount() {
    logout();
    window.location = "/";
  }
  render() {
    return null;
  }
}

export default LogOut;
