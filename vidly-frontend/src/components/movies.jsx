import React, { Component } from "react";

import Like from "./common/likeComponent";
import TableHead from "./common/tableHead";

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
      },
      {
        key: "delete",
      },
    ];

    return (
      <React.Fragment>
        <h6>{`Showing ${this.props.movies.length} movies from database`}</h6>
        <table className="table">
          <TableHead
            columns={columns}
            sortColumn={this.props.sortColumn}
            onSort={this.props.onSort}
          />
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
                    {
                      <Like
                        isLiked={liked}
                        onClick={() => this.props.onLike(_id)}
                      />
                    }
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
