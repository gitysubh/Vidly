import React from "react";
import Joi from "joi-browser"

import Form from "./common/form";

class Register extends Form {
  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().min(5).max(16).label("Password"),
    name: Joi.string().required().label("Password")
  };

  async doSubmit() {
    alert("success");
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
