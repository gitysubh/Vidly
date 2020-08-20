import React from "react";
const Input = ({ name, errorText, label, ...others }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        id={name}
        className={`form-control ${errorText ? "is-invalid" : ""}`}
        {...others}
      />
      <small className="invalid-feedback">{errorText}</small>
    </div>
  );
};

export default Input;
