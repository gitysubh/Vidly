import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate, genreFilter } from "../utils/movieFilter";
import Movies from "./movies";
class MovieList extends Component {
  pageSize = 4;

  state = {
    movies: getMovies(),
    currentPage: 1,
    genres: getGenres(),
    currentGenres: "",
  };

  handleDelete(id) {
    const movies = this.state.movies.filter(({ _id }) => _id !== id);
    this.setState({ movies });
  }

  handleLike(id) {
    const movies = this.state.movies.map((movie) =>
      movie._id === id ? { ...movie, liked: !movie.liked } : movie
    );
    this.setState({ movies });
  }

  handlePageChange(pageNumber) {
    this.setState({ currentPage: pageNumber });
  }

  handleGenreChange(genreId) {
    this.setState({ currentGenres: genreId || "", currentPage: 1 });
  }

  render() {

    const genreFilteredMovies = genreFilter(this.state.movies, this.state.currentGenres);
    const { length: count } = genreFilteredMovies;

    const movies = paginate(
      genreFilteredMovies,
      this.state.currentPage,
      this.pageSize
    );

    if (count < 1) return <p>No movies are available currently</p>;
    else {
      return (
        <React.Fragment>
          <div className="row">
            <div className="col-3">
              <ul className="list-group">
                <li
                  className={`list-group-item ${
                    this.state.currentGenres === "" ? "active" : ""
                  }`}
                  onClick={() => this.handleGenreChange()}
                >
                  All Generes
                </li>
                {this.state.genres.map(({ name, _id }) => (
                  <li
                    key={_id}
                    className={`list-group-item ${
                      this.state.currentGenres === _id ? "active" : ""
                    }`}
                    onClick={() => this.handleGenreChange(_id)}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>

            <div className="col">
              <Movies
                movies={movies}
                onLike={(_id) => this.handleLike(_id)}
                onDelete={(_id) => this.handleDelete(_id)}
              />

              <Pagination
                count={count}
                onPageChange={(pageNumber) => this.handlePageChange(pageNumber)}
                pageSize={this.pageSize}
                currentPage={this.state.currentPage}
              />
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default MovieList;
