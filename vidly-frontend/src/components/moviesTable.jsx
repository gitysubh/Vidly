import React, { Component } from "react";
import { Link } from "react-router-dom";

import Like from "./common/likeComponent";
import Table from "./common/table";
import auth from "../services/authService";

class MoviesTable extends Component {
  render() {
    const user = auth.getCurrentUser();
    const isAdmin = user && user.isAdmin;
    const columns = [
      {
        path: "title",
        name: "Title",
        content: (movie) =>
          isAdmin ? (
            <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
          ) : (
            <span>{movie.title}</span>
          ),
      },
      {
        path: "genre.name",
        name: "Genre",
      },
      {
        path: "numberInStock",
        name: "Stock",
      },
      {
        path: "dailyRentalRate",
        name: "Rate",
      },
      {
        key: "like",
        content: (movie) => (
          <Like
            isLiked={movie.liked}
            onClick={() => this.props.onLike(movie._id)}
          />
        ),
      },
      {
        key: "delete",
        content: (movie) =>
          isAdmin ? (
            <button
              onClick={() => this.props.onDelete(movie._id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          ) : (
            ""
          ),
      },
    ];

    return (
      <Table
        columns={columns}
        sortColumn={this.props.sortColumn}
        onSort={this.props.onSort}
        data={this.props.movies}
      />
    );
  }
}

export default MoviesTable;
