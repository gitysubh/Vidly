import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  handleChange = (e) => {
    const el = e.target;
    const { data, errors } = this.state;
    data[el.name] = el.value;
    delete errors[el.name];
    this.setState({ data, errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validateForm();
    if (errors && Object.keys(errors).length) {
      this.setState({ errors: errors || {} });
      return;
    } else this.doSubmit();
  };

  validateForm = (e) => {
    const options = { abortEarly: false };
    const { error: validatorErrors } = Joi.validate(
      this.state.data,
      this.schema,
      options
    );
    if (!validatorErrors) return null;

    let errors = {};
    validatorErrors.details.map((errorItem) => {
      if (errors.hasOwnProperty(errorItem.path[0])) return;
      errors = { ...errors, ...{ [errorItem.path[0]]: errorItem.message } };
    });
    return errors;
  };

  validateField = (e) => {
    const el = e.target;
    const schema = { [el.name]: this.schema[el.name] };
    if (schema) {
      const { error: validatorErrors } = Joi.validate(
        { [el.name]: el.value },
        schema
      );
      if (validatorErrors) {
        const error = { [el.name]: validatorErrors.details[0].message };
        this.setState({ errors: { ...this.state.errors, ...error } });
      }
    }
  };

  renderInput({ name, label, type = "text", placeholder, ...rest }) {
    const { data, errors } = this.state;
    return (
      <Input
        label={label}
        name={name}
        value={data[name] || ""}
        onChange={this.handleChange}
        errorText={errors[name]}
        placeholder={placeholder}
        onBlur={this.validateField}
        type={type || "text"}
        {...rest}
      />
    );
  }

  renderSelect({name, label, ...others}) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        label={label}
        selectedItem={data[name]}
        onChange={this.handleChange}
        onBlur={this.validateField}
        errorText={errors[name]}
        {...others}
      />
    );
  }

  renderSubmitButton(label) {
    const disabled = !!Object.keys(this.state.errors).length;

    return (
      <button type="submit" className="btn btn-primary" disabled={disabled}>
        {label}
      </button>
    );
  }
}

export default Form;
