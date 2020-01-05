import React, { Component, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loginAdmin, logoutUser } from "../../actions/authentication";
import classnames from "classnames";
import { resetErrors } from "../../actions/event";

const AdminLogin = ({
  auth,
  resetErrors,
  loginAdmin,
  logoutUser,
  ...props
}) => {
  const [state, setState] = useState({
    userName: "",
    password: "",
    errors: {}
  });

  const { isAuthenticated, isAdmin } = auth;

  useEffect(() => {
    resetErrors({});
    if (isAuthenticated && isAdmin) {
      props.history.push("/events");
    }
  }, []);

  useEffect(() => {
    setState({
      ...state,
      errors: props.errors
    });
  }, [props.errors]);

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/events");
    }
  }, [isAuthenticated]);

  const handleInputChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (isAuthenticated) {
      logoutUser(props.history, false);
    }
    const admin = {
      userName: state.userName,
      password: state.password
    };

    loginAdmin(admin);
  };

  const { errors } = state;
  return (
    <div className="container" style={{ marginTop: "50px", width: "700px" }}>
      <h2 style={{ marginBottom: "40px" }}>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Admin username"
            className={classnames("form-control", {
              "is-invalid": errors.userName
            })}
            name="userName"
            onChange={handleInputChange}
            value={state.userName}
          />
          {errors.userName && (
            <div className="invalid-feedback">{errors.userName}</div>
          )}
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            className="form-control"
            name="password"
            onChange={handleInputChange}
            value={state.password}
            className={classnames("form-control", {
              "is-invalid": errors.password
            })}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Admin login
          </button>
        </div>
      </form>
    </div>
  );
};

AdminLogin.propTypes = {
  errors: PropTypes.object.isRequired,
  loginAdmin: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {
  loginAdmin,
  logoutUser,
  resetErrors
})(withRouter(AdminLogin));
