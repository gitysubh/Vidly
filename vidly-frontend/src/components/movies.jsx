import React, { Component } from "react";

import Like from "./common/likeComponent";

class MoviesTable extends Component {
  onRaiseSort(path) {
    let { sortColumn } = this.props;
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn = { path, order: "asc" };
    }
    this.props.onSort(sortColumn);
  }

  render() {
    return (
      <React.Fragment>
        <h6>{`Showing ${this.props.movies.length} movies from database`}</h6>
        <table className="table">
          <thead>
            <tr>
              <th onClick={() => this.onRaiseSort("title")}>Title</th>
              <th onClick={() => this.onRaiseSort("genre.name")}>Genre</th>
              <th onClick={() => this.onRaiseSort("numberInStock")}>Stock</th>
              <th onClick={() => this.onRaiseSort("dailyRentalRate")}>Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.movies.map(
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
                    {<Like isLiked={liked} onClick={() => this.props.onLike(_id)} />}
                  </td>
                  <td>
                    <button
                      onClick={() => this.props.onDelete(_id)}
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

export default MoviesTable;
