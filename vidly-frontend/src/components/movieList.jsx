import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./likeComponent";
import Pagination from "./pagination";
import paginate from "../utils/paginate";
class MovieList extends Component {
  pageSize = 4;

  state = {
    movies: getMovies(),
    currentPage: 1,
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

  render() {
    const { length: count } = this.state.movies;

    const movies = paginate(
      this.state.movies,
      this.state.currentPage,
      this.pageSize
    );

    if (count < 1) return <p>No movies are available currently</p>;
    else {
      return (
        <React.Fragment>
          <h6>{`Showing ${this.state.movies.length} movies from database`}</h6>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {movies.map(
                ({
                  _id,
                  title,
                  genre,
                  numberInStock,
                  dailyRentalRate,
                  liked,
                }) => (
                  <tr key={_id}>
                    <td>{title}</td>
                    <td>{genre.name}</td>
                    <td>{numberInStock}</td>
                    <td>{dailyRentalRate}</td>
                    <td>
                      {
                        <Like
                          isLiked={liked}
                          onClick={() => this.handleLike(_id)}
                        />
                      }
                    </td>
                    <td>
                      <button
                        onClick={() => this.handleDelete(_id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          <Pagination
            count={count}
            onPageChange={(pageNumber) => this.handlePageChange(pageNumber)}
            pageSize={this.pageSize}
            currentPage={this.state.currentPage}
          />
        </React.Fragment>
      );
    }
  }
}

export default MovieList;
