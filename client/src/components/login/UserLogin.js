import React, { Component, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../actions/authentication";
// import FbLogin from './FbLogin';
import classnames from "classnames";
import { resetErrors } from "../../actions/event";

const UserLogin = ({ loginUser, resetErrors, auth, ...props }) => {
  const { isAuthenticated } = auth;

  const [state, setState] = useState({
    email: "",
    password: "",
    errors: {}
  });

  useEffect(() => {
    resetErrors({});
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/userEvents");
    }
  });

  useEffect(() => {
    if (props.errors) {
      setState({
        ...state,
        errors: props.errors
      });
    }
  }, [props.errors]);

  const handleInputChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const user = {
      email: state.email,
      password: state.password
    };
    loginUser(user);
  };

  const onSignUp = () => {
    props.history.push("/addUser");
  };

  const { errors } = state;

  return (
    <div
      className="container justify-content-center align-content-center login-form"
      style={{ maxWidth: "400px", marginTop: "50px", marginRight: "0px" }}
    >
      <div className="justify-content-center">
        <h1 className="font-bold text-right title">
          <strong>Hackathon Management App</strong>
        </h1>
        <h5
          className="font-bold text-center"
          style={{ marginBottom: "40px" }}
        ></h5>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            className={classnames("form-control cust-input", {
              "is-invalid": errors.email
            })}
            name="email"
            onChange={handleInputChange}
            value={state.email}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
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
            className={classnames("form-control cust-input", {
              "is-invalid": errors.password
            })}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>
        <div
          className="form-row justify-content-around"
          style={{ marginTop: "40px" }}
        >
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onSignUp}
          >
            Sign up
          </button>
        </div>
        {/* <div className="text-center" style={{ margin: '4vh 0px 2vh 0' }}>
            or
          </div>
          <div className="form-row justify-content-center">
            <p className="text-center">
              <strong>Login with</strong>
            </p>
          </div>
          <div className="d-flex justify-content-around"> */}

        {/* <div>Google</div>
            <div>LinkedIn</div> */}
        {/* </div> */}
      </form>
      {/* <FbLogin /> */}
    </div>
  );
};

UserLogin.propTypes = {
  errors: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser, resetErrors })(
  withRouter(UserLogin)
);
