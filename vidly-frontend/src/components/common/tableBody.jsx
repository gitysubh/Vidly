import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell(item, column) {
    if (column.content) {
      return column.content(item);
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
