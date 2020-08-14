import React from "react";
import propTypes from "prop-types";

import Like from "./common/likeComponent";

const Movies = ({ movies, onLike, onDelete }) => {
  return (
    <React.Fragment>
      <h6>{`Showing ${movies.length} movies from database`}</h6>
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
            ({ _id, title, genre, numberInStock, dailyRentalRate, liked }) => (
              <tr key={_id}>
                <td>{title}</td>
                <td>{genre.name}</td>
                <td>{numberInStock}</td>
                <td>{dailyRentalRate}</td>
                <td>{<Like isLiked={liked} onClick={() => onLike(_id)} />}</td>
                <td>
                  <button
                    onClick={() => onDelete(_id)}
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
};

Movies.propTypes = {
  movies: propTypes.arrayOf(
    propTypes.shape({
      _id: propTypes.string.isRequired,
      title: propTypes.string.isRequired,
      genre: propTypes.shape({
        name: propTypes.string.isRequired,
      }).isRequired,
      numberInStock: propTypes.number.isRequired,
      dailyRentalRate: propTypes.number.isRequired,
      liked: propTypes.bool.isRequired,
    }).isRequired
  ).isRequired,
  onDelete: propTypes.func.isRequired,
  onLike: propTypes.func.isRequired,
};

export default Movies;
