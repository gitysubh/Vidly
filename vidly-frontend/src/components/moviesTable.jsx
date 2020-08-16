import React, { Component } from "react";

import Like from "./common/likeComponent";
import Table from "./common/table";

class MoviesTable extends Component {
  render() {
    const columns = [
      {
        path: "title",
        name: "Title",
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
        content: (movie) => (
          <button
            onClick={() => this.props.onDelete(movie._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
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
