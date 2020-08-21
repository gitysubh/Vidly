import React from "react";

const Select = ({ label, name, options = [], selectedItem,errorText, ...others }) => {
  return (
    <div className="form-group">
      <label htmlFor="exampleFormControlSelect1">{label}</label>
      <select
        name={name}
        id={name}
        className={`form-control ${errorText ? "is-invalid" : ""}`}
        id="exampleFormControlSelect1"
        {...others}
        value={selectedItem}
      >
        <option value="">Choose One</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <small className="invalid-feedback">{errorText}</small>
    </div>
  );
};

export default Select;
