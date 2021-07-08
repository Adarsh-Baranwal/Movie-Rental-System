import React, { Component } from "react";
import { Link } from "react-router-dom";
import Heart from "./like";

class TableBody extends Component {
  state = {};
  render() {
    let { movies, onlike, OnDelete } = this.props;
    return (
      <tbody>
        {movies.map((movie) => {
          let currentmovie = "/movies/" + movie._id;
          return (
            <tr key={movie._id}>
              <td>
                <Link to={currentmovie}>{movie.title}</Link>
              </td>
              <td>{movie.genere.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Heart liked={movie.liked} onlike={() => onlike(movie)} />
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => OnDelete(movie._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  }
}

export default TableBody;
