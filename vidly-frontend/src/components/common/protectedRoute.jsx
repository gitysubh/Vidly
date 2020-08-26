import React from "react";
import auth from "../../services/authService";
import { Route, Redirect } from "react-router-dom";
import { func } from "prop-types";

const ProtectedRoute = ({ role, ...others }) => {
  const user = auth.getCurrentUser();

  if (role === "admin" && user) {
    return user.isAdmin ? (
      getRoute({ ...others })
    ) : (
      <Redirect to={"/"} />
    );
  } else if (!role && user) {
    return getRoute({ ...others });
  } else if (!user) {
    return <Redirect to={"/login"} />;
  }
};

function getRoute({ path, component: Component, ...others }) {
  return (
    <Route
      path={path}
      render={(props) => <Component {...props} {...others} />}
    />
  );
}

export default ProtectedRoute;
