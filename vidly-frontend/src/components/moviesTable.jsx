import React, { Component } from "react";
import { Link } from "react-router-dom";

import Like from "./common/likeComponent";
import Table from "./common/table";
import auth from "../services/authService";

class MoviesTable extends Component {
  deleteColumn = {
    key: "delete",
    content: (movie) => (
      <button
        onClick={() => this.props.onDelete(movie._id)}
        className="btn btn-danger"
      >
        Delete
      </button>
    ),
  };

  render() {
    const user = auth.getCurrentUser();
    const columns = [
      {
        path: "title",
        name: "Title",
        content: (movie) =>
          user && user.isAdmin ? (
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
    ];

    if (user && user.isAdmin) columns.push(this.deleteColumn);

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
