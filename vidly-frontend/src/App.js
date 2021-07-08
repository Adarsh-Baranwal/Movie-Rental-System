import "./App.css";
import React, { Component } from "react";
import Movie from "./components/movies";
import { Route, Switch, Redirect } from "react-router-dom";
import Rentals from "./components/rental";
import Customers from "./components/customers";
import NotFound from "./components/common/not-found";
import MovieForm from "./components/moviedetail";
import Login from "./components/login";
import Register from "./components/register";
import NavBar from "./components/common/navbar";
import LogOut from "./components/logout";
import { getCurrentUser } from "./services/authService";

class App extends Component {
  state = {};
  componentDidMount() {
    let token = getCurrentUser();
    this.setState({ user: token });
  }
  render() {
    return (
      <React.Fragment>
        <NavBar user={this.state.user} />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/logout" component={LogOut} />
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/movies" component={Movie} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/customers" component={Customers} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" to="/movies" exact></Redirect>
          <Redirect to="/not-found"></Redirect>
        </Switch>
      </React.Fragment>

      //</main>
    );
  }
}

export default App;
