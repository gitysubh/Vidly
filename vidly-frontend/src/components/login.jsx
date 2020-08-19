import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./common/input";

class Login extends Component {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().min(6).max(16).label("Password"),
  };

  handleChange = (e) => {
    const el = e.target;
    const { data, errors } = this.state;
    data[el.name] = el.value;
    errors[el.name] = "";
    this.setState({ data, errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validateForm();
    if (errors && Object.keys(errors).length) {
      this.setState({ errors: errors || {} });
      return;
    } else alert("success");
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

  render() {
    const { email, password } = this.state.data;
    const { errors } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          label="Enter Email"
          name="email"
          value={email}
          onChange={this.handleChange}
          errorText={errors.email}
          placeholder="Enter your email"
          validator={this.validateField}
        />
        <Input
          label="Enter Password"
          name="password"
          value={password}
          onChange={this.handleChange}
          errorText={errors.password}
          type="password"
          placeholder="Enter your password"
          validator={this.validateField}
        />

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

export default Login;
