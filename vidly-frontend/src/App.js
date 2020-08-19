import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Movies from "./components/movies";
import Navbar from "./components/common/navbar";
import MoviesForm from "./components/movieForm";
import Login from "./components/login";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="container">
        <Switch>
          <Route path="/movies/:id" component={MoviesForm} />
          <Route path="/movies" component={Movies} />
          <Route path="/customers" render={() => <h1>Customers</h1>} />
          <Route path="/Rental" render={() => <h1>Rental</h1>} />
          <Route path="/login" component={Login} />
          <Route path="/404" render={() => <h1>Not Found</h1>} />
          <Redirect from="/" to="/movies" exact />
          <Redirect to="/404" />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
