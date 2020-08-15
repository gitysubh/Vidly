import React from "react";

const ListGroup = ({
  items,
  textProperty,
  valueProperty,
  selectedItem,
  onSelectItem,
}) => {
  return (
    <ul className="list-group">
      {items.map((item) => {
        return (
          <li
            key={item[valueProperty]}
            className={`list-group-item ${
              selectedItem === item ? "active" : ""
            }`}
            onClick={() => onSelectItem(item)}
          >
            {item[textProperty]}
          </li>
        );
      })}
    </ul>
  );
};

export default ListGroup;
