import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import Form from "./common/form";
import auth from "../services/authService";

class Login extends Form {
  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().min(5).max(16).label("Password"),
  };

  async doSubmit() {
    try {
      const { email, password } = this.state.data;
      await auth.login(email, password);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors, email: ex.response.data };
        this.setState({ errors: errors });
      } else {
        toast.error("Something went wrong");
      }
    }
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
