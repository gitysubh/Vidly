import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class Login extends Form {
  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().min(6).max(16).label("Password"),
  };

  doSubmit() {
    alert("success");
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput({
            name: "email",
            label: "Email",
            placeholder: "Enter your email",
          })}
          {this.renderInput({
            name: "password",
            label: "Password",
            placeholder: "Enter your password",
          })}

          {this.renderSubmitButton("Login")}
        </form>
      </div>
    );
  }
}

export default Login;
