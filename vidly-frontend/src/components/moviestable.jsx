import React, { Component } from "react";
import TableBody from "./common/tablebody";
import TableHeader from "./common/tableheader";

class MoviesTable extends Component {
  coloumns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    { key: "like" },
    { key: "delete" },
  ];
  render() {
    let { movies, OnDelete, onlike, setColoumn, Onsort } = this.props;
    return (
      <table className="table">
        <TableHeader
          setColoumn={setColoumn}
          Onsort={Onsort}
          coloumns={this.coloumns}
        />
        <TableBody movies={movies} onlike={onlike} OnDelete={OnDelete} />
      </table>
    );
  }
}

export default MoviesTable;
