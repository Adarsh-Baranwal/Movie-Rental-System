import http from "./httpService";

export function getMovies() {
  return http.get("http://localhost:3900/api/movies");
}

export function getMovie(id) {
  return http.get("http://localhost:3900/api/movies/" + id);
}

export function deleteMovie(id) {
  return http.delete("http://localhost:3900/api/movies/" + id);
}

export function saveMovie(movie) {
  if (movie._id) {
    return http.put("http://localhost:3900/api/movies/" + movie._id, {
      title: movie.title,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
      genereId: movie.genreId,
    });
  }

  return http.post("http://localhost:3900/api/movies", {
    title: movie.title,
    numberInStock: movie.numberInStock,
    dailyRentalRate: movie.dailyRentalRate,
    genereId: movie.genreId,
  });
}
