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

  handleChange = (e) => {
    const el = e.target;
    const { data } = this.state;
    data[el.name] = el.value;
    this.setState({ data });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    
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
          errorText={errors.username}
          type="email"
          placeholder="Enter your email"
        />
        <Input
          label="Enter Password"
          name="password"
          value={password}
          onChange={this.handleChange}
          errorText={errors.password}
          type="password"
          placeholder="Enter your password"
        />

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

export default Login;
