import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import setAuthToken from "./setAuthToken";
import jwt_decode from "jwt-decode";
import { setCurrentUser, setAdmin, logoutUser } from "./actions/authentication";
import "../node_modules/normalize.css/normalize.css";
// import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./styles/styles.scss";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  decoded.userName === "admin"
    ? store.dispatch(setAdmin(decoded))
    : store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

const App = () => {
  const style = {
    overflowY: "overlay"
  };
  return (
    <Provider store={store}>
      <Router>
        <div style={{ height: "100%" }}>
          <AppRouter />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
