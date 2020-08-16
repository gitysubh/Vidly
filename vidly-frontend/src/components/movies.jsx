import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate, genreFilter, sortMovies } from "../utils/movieFilter";
import MoviesTable from "./moviesTable";
import ListGroup from "./common/lIstGroup.jsx";

class Movies extends Component {
  pageSize = 4;

  state = {
    movies: [],
    currentPage: 1,
    genres: [],
    currentGenre: undefined,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: 0, name: "All Generes" }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres,
      currentGenre: genres[0],
    });
  }

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

  handleGenreChange(genre) {
    this.setState({
      currentGenre: this.state.genres.filter(
        (item) => item._id === genre._id
      )[0],
      currentPage: 1,
    });
  }

  handleSort(sortColumn) {
    console.log(sortColumn);
    this.setState({ sortColumn });
  }

  render() {
    const genreFilteredMovies = genreFilter(
      this.state.movies,
      this.state.currentGenre
    );
    const { length: count } = genreFilteredMovies;

    const movies = paginate(
      sortMovies(
        genreFilteredMovies,
        this.state.sortColumn.path,
        this.state.sortColumn.order
      ),
      this.state.currentPage,
      this.pageSize
    );

    if (count < 1) return <p>No movies are available currently</p>;
    else {
      return (
        <React.Fragment>
          <div className="row">
            <div className="col-3">
              <ListGroup
                items={this.state.genres}
                textProperty="name"
                valueProperty="_id"
                selectedItem={this.state.currentGenre}
                onSelectItem={(id) => this.handleGenreChange(id)}
              />
            </div>

            <div className="col">
              <h6>{`Showing ${count} movies from database`}</h6>
              <MoviesTable
                movies={movies}
                onLike={(_id) => this.handleLike(_id)}
                onDelete={(_id) => this.handleDelete(_id)}
                sortColumn={this.state.sortColumn}
                onSort={(sortColumn) => {
                  this.handleSort(sortColumn);
                }}
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

export default Movies;
