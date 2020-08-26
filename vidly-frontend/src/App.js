import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies";
import Navbar from "./components/common/navbar";
import MoviesForm from "./components/movieForm";
import Login from "./components/login";
import Register from "./components/register";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";

class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user: user });
  }

  render() {
    return (
      <BrowserRouter>
        <ToastContainer />
        <Navbar user={this.state.user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={Register} />
            <ProtectedRoute
              path="/movies/:id"
              component={MoviesForm}
              role="admin"
            />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" render={() => <h1>Customers</h1>} />
            <Route path="/Rental" render={() => <h1>Rental</h1>} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/404" render={() => <h1>Not Found</h1>} />
            <Redirect from="/" to="/movies" exact />
            <Redirect to="/404" />
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
