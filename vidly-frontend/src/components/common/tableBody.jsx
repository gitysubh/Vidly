import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";

class TableBody extends Component {
  renderCell(item, column) {
    if (column.content) {
      return column.content(item);
    } else if (column.path === "title") {
      return <Link to={"/movies/" + item._id} push>{_.get(item, column.path)}</Link>;
    } else {
      return _.get(item, column.path);
    }
  }

  getKey(row, column) {
    return row._id + (column.path || column.key);
  }
  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map((row) => (
          <tr key={row._id}>
            {columns.map((column) => (
              <td key={this.getKey(row, column)}>
                {this.renderCell(row, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;

{
  /* <td>{title}</td>
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
              </td> */
}
