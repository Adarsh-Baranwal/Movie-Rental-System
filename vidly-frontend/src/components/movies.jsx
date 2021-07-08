import React, { Component } from "react";
import { deleteMovie } from "../services/MovieService";
import { getMovies } from "../services/MovieService";
import Pagination from "./common/pagination";
import { pagination } from "../utils/pagination";
import Genres from "./common/listGroup";
import { getGenres } from "../services/GenreService";
import MoviesTable from "./moviestable";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./common/search";

class Movie extends Component {
  state = {
    movies: [],
    genres: [],
    PageSize: 4,
    searchQuery: "",
    currentPage: 1,
    currentGenre: null,
    setColoumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const movie = await getMovies();
    this.setState({ movies: movie["data"], genres: data });
  }
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handletodeletemovie = async (id) => {
    await deleteMovie(id);
    let movies = await getMovies();
    movies = movies.data;
    let genre = this.state.currentGenre;
    if (genre !== null) {
      movies = movies.filter((movie) => {
        return movie.genere._id === genre;
      });
    }
    let page = this.state.currentPage;
    let PageSize = this.state.PageSize;
    if (movies.length === (page - 1) * PageSize) page = page - 1;
    this.setState({ currentPage: page, movies });
  };
  handlegenrechange = async (genre) => {
    let movies = await getMovies();
    movies = movies["data"];
    if (genre === null) {
      this.setState({
        currentGenre: genre,
        searchQuery: "",
        movies: movies,
        currentPage: 1,
      });
      return;
    }
    movies = movies.filter((movie) => {
      return movie.genere._id === genre;
    });
    this.setState({
      currentGenre: genre,
      searchQuery: "",
      movies: movies,
      currentPage: 1,
    });
  };
  onlike = (movie) => {
    let index = this.state.movies.indexOf(movie);
    let movies = [...this.state.movies];
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handletosort = (setColoumn) => {
    this.setState({ setColoumn });
  };
  handleSearch = async (query) => {
    let movies = await getMovies();
    movies = movies["data"];
    if (query.trim() !== "")
      movies = movies.filter((movie) =>
        movie.title.toLowerCase().startsWith(query.toLowerCase())
      );
    this.setState({
      searchQuery: query,
      currentPage: 1,
      currentGenre: null,
      movies,
    });
  };
  coloumns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    { key: "like" },
    { key: "delete" },
  ];
  render() {
    // console.log(this.state.movies[0].title);
    let movies = _.orderBy(
      this.state.movies,
      [this.state.setColoumn.path],
      [[this.state.setColoumn.order]]
    );

    movies = pagination(movies, this.state.currentPage, this.state.PageSize);
    return (
      <React.Fragment>
        <main className="Container m-5">
          <div className="row">
            <div className="col-2">
              <Genres
                list={this.state.genres}
                onlistchange={this.handlegenrechange}
                currentGenre={this.state.currentGenre}
              />
            </div>

            <div className="col">
              <p>There is {this.state.movies.length} movies in this list.</p>
              <Link
                className="btn btn-primary"
                style={{ marginBottom: 15 }}
                to="/movies/new"
              >
                New Movie
              </Link>
              <SearchBox
                value={this.state.searchQuery}
                onChange={this.handleSearch}
              />
              <MoviesTable
                setColoumn={this.state.setColoumn}
                Onsort={this.handletosort}
                movies={movies}
                onlike={this.onlike}
                OnDelete={this.handletodeletemovie}
              />

              <Pagination
                itemCount={this.state.movies.length}
                PageSize={this.state.PageSize}
                currentPage={this.state.currentPage}
                OnPageChange={this.handlePageChange}
              />
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default Movie;
