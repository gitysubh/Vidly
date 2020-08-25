import React from "react";
import Joi from "joi-browser";

import Form from "./common/form";
import * as userService from "../services/userService";
import { setToken } from "../services/authService";

class Register extends Form {
  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().min(5).max(16).label("Password"),
    name: Joi.string().required().label("Password"),
  };

  async doSubmit() {
    try {
      const response = await userService.register(this.state.data);
      const { headers } = response;

      if (headers && headers["x-auth-token"]) {
        setToken(headers["x-auth-token"]);
        this.props.history.push("/");
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors, email: ex.response.data };
        this.setState({ errors });
      }
    }
  }

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput({
            name: "email",
            placeholder: "Enter your email",
            label: "Email",
          })}
          {this.renderInput({
            name: "password",
            placeholder: "Enter your password",
            label: "Password",
            type: "password",
          })}
          {this.renderInput({
            name: "name",
            placeholder: "Enter your name",
            label: "Name",
          })}

          {this.renderSubmitButton("Register")}
        </form>
      </div>
    );
  }
}

export default Register;
