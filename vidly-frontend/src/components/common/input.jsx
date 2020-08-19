import React from "react";
const Input = ({
  label,
  name,
  type,
  placeholder,
  value,
  errorText,
  onChange,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        id={name}
        value={value}
        type={type || "text"}
        className="form-control"
        placeholder={placeholder}
        onChange={onChange}
      />
      <small className="invalid-feedback">{errorText}</small>
    </div>
  );
};

export default Input;
