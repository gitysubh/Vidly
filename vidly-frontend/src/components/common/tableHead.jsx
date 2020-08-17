import React, { Component } from "react";

class TableHead extends Component {
  // columns:{path,name,key}
  // onSort:()=>void
  // sortColumn:{path,order}

  onRaiseSort(path) {
    let { sortColumn } = this.props;
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn = { path, order: "asc" };
    }
    this.props.onSort(sortColumn);
  }

  getSortIcon(path) {
    let { sortColumn } = this.props;
    if (!path) {
      return null;
    } else if (path === sortColumn.path) {
      return sortColumn.order === "asc" ? (
        <i className="fas fa-caret-up"></i>
      ) : (
        <i className="fas fa-caret-down"></i>
      );
    }
  }

  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.path || column.key}
              onClick={() => this.onRaiseSort(column.path)}
              className="clickable"
            >
              {column.name} {this.getSortIcon(column.path)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHead;
