import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink to="/" className="navbar-brand">
        Vidly
      </NavLink>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <NavLink
            to="/movies"
            activeClassName="active"
            className="nav-item nav-link"
          >
            Movies
          </NavLink>
          <NavLink
            to="/customers"
            activeClassName="active"
            className="nav-item nav-link"
          >
            Customers
          </NavLink>
          <NavLink
            to="/Rental"
            activeClassName="active"
            className="nav-item nav-link"
          >
            Rental
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
