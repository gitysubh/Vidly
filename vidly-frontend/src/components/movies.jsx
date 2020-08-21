import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import {
  paginate,
  genreFilter,
  sortMovies,
  searchFilter,
} from "../utils/movieFilter";
import MoviesTable from "./moviesTable";
import ListGroup from "./common/lIstGroup.jsx";
import Input from "./common/input";

class Movies extends Component {
  pageSize = 4;
  allGenreObj = { _id: 0, name: "All Generes" };

  state = {
    movies: [],
    currentPage: 1,
    genres: [],
    currentGenre: undefined,
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
  };

  componentDidMount() {
    const genres = [this.allGenreObj, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres,
      currentGenre: genres[0],
    });
  }

  handleDelete(id) {
    const movies = this.state.movies.filter(({ _id }) => _id !== id);
    deleteMovie(id);
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
      searchQuery: "",
    });
  }

  handleSort(sortColumn) {
    this.setState({ sortColumn });
  }

  handleSearch = (e) => {
    const query = e.target.value;

    this.setState({
      searchQuery: query || "",
      currentGenre: this.allGenreObj,
      currentPage: 1,
    });
  };

  getPagedData() {
    const {
      movies,
      sortColumn,
      currentPage,
      currentGenre,
      searchQuery,
    } = this.state;

    const filteredMovies = searchQuery
      ? searchFilter(movies, searchQuery)
      : genreFilter(movies, currentGenre);

    const { length: count } = filteredMovies;

    const pagedMovies = paginate(
      sortMovies(filteredMovies, sortColumn.path, sortColumn.order),
      currentPage,
      this.pageSize
    );
    return { totalCount: count, movies: pagedMovies };
  }

  render() {
    const { totalCount, movies } = this.getPagedData();
    const { searchQuery } = this.state;

    if (this.state.movies < 1) return <p>No movies are available currently</p>;
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
              <button
                className="btn btn-primary mb-3"
                onClick={() => this.props.history.push("/movies/new")}
              >
                New Movie
              </button>
              <h6>{`Showing ${totalCount} movies from database`}</h6>

              <Input
                name="searchMovie"
                placeholder="Search..."
                onChange={this.handleSearch}
                value={searchQuery}
              />

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
                count={totalCount}
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
