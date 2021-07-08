import React from "react";
import Form from "./common/Form";
import { saveMovie } from "../services/MovieService";
import { getMovie } from "../services/MovieService";
import { getGenres } from "../services/GenreService";
import Joi from "joi-browser";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      numberInStock: "",
      genreId: "",
      dailyRentalRate: "",
    },
    genres: [],
    error: {},
  };
  schema = {
    _id: Joi.string(),
    title: Joi.string().required(),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().required().min(0).max(100),
    dailyRentalRate: Joi.number().required().min(0).max(10),
  };
  async componentDidMount() {
    let genres = await getGenres();
    genres = genres.data;
    this.setState({ genres });
    if (this.props.match.params.id === "new") return;
    try {
      let movie = await getMovie(this.props.match.params.id);
      movie = movie.data;
      let data = { ...this.state.data };
      data = {
        _id: movie._id,
        title: movie.title,
        genreId: movie.genere._id,
        numberInStock: movie.numberInStock,
        dailyRentalRate: movie.dailyRentalRate,
      };
      this.setState({ data });
    } catch (ex) {
      if (
        (ex.response && ex.response.status === 404) ||
        ex.response.status === 400
      )
        return this.props.history.replace("/not-found");
    }
  }
  dosubmit = async () => {
    await saveMovie(this.state.data);
    this.props.history.push("/movies");
  };
  render() {
    return (
      <React.Fragment>
        <div className="loginform">
          <h1>Movie Form - {this.props.match.params.id}</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("title", "Title")}
            {this.renderSelect("genreId", "Genre", this.state.genres)}
            {this.renderInput("numberInStock", "Number In Stock")}
            {this.renderInput("dailyRentalRate", "Rate")}
            {this.renderButton("Save")}
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default MovieForm;
