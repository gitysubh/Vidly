import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./likeComponent";

class MovieList extends Component {
  state = {
    movies: getMovies(),
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

  render() {
    if (this.state.movies.length < 1)
      return <p>No movies are available currently</p>;
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
              {this.state.movies.map(
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
        </React.Fragment>
      );
    }
  }
}

export default MovieList;
