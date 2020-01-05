import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addTeamMember } from "../../actions/teams";
import classnames from "classnames";
import { resetErrors } from "../../actions/event";
import AbsoluteWrapper from "../AbsoluteWrapper";

const AddTeamMember = ({ addTeamMember, resetErrors, ...props }) => {
  const [state, setState] = useState({
    errors: {},
    firstName: "",
    lastName: "",
    email: "",
    mobile: ""
  });

  useEffect(() => {
    resetErrors({});
  }, []);

  useEffect(() => {
    setState({
      ...state,
      errors: props.errors
    });
  }, [props.errors]);

  const handleChange = e => {
    e.preventDefault();
    let nam = e.target.name;
    let val = e.target.value;
    setState({ ...state, [nam]: val });
  };
  const handleSubmit = e => {
    e.preventDefault();
    const route = "/teamDetails/" + props.match.params.id;
    const teamDetail = {
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      mobile: state.mobile,
      participant: props.match.params.id
    };
    addTeamMember(
      teamDetail,
      props.history,
      route,
      props.history.location.state.teamName
    );
  };
  const onBackClick = event => {
    event.preventDefault();
    props.history.push({
      pathname: "/teamDetails/" + props.match.params.id,
      state: { teamName: props.history.location.state.teamName }
    });
  };

  const { errors } = state;
  return (
    <AbsoluteWrapper>
      <div
        className="container justify-content-center align-content-center"
        style={{ maxWidth: "400px", marginTop: "50px" }}
      >
        <div className="justify-content-center">
          <h1
            className="font-bold text-center"
            style={{ marginBottom: "40px" }}
          >
            Add Team member
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-12">
              <input
                className={classnames("form-control cust-input", {
                  "is-invalid": errors.firstName
                })}
                type="text"
                name="firstName"
                placeholder="First name"
                onChange={handleChange}
              />
              {errors.firstName && (
                <div className="invalid-feedback">{errors.firstName}</div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-12">
              <input
                className={classnames("form-control cust-input", {
                  "is-invalid": errors.lastName
                })}
                type="text"
                name="lastName"
                placeholder="Last name"
                onChange={handleChange}
              />
              {errors.lastName && (
                <div className="invalid-feedback">{errors.lastName}</div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-12">
              <input
                className={classnames("form-control cust-input", {
                  "is-invalid": errors.email
                })}
                type="email"
                name="email"
                placeholder="Email address"
                onChange={handleChange}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-12">
              <input
                className={classnames("form-control cust-input", {
                  "is-invalid": errors.mobile
                })}
                type="number"
                name="mobile"
                placeholder="Mobile Number"
                onChange={handleChange}
              />
              {errors.mobile && (
                <div className="invalid-feedback">{errors.mobile}</div>
              )}
            </div>
          </div>

          <div
            className="form-row justify-content-around"
            style={{ marginTop: "10px" }}
          >
            <button className="btn btn-secondary" onClick={onBackClick}>
              Back
            </button>
            <button className="btn btn-primary" type="submit">
              Add Team Member!
            </button>
          </div>
        </form>
      </div>
    </AbsoluteWrapper>
  );
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(mapStateToProps, { addTeamMember, resetErrors })(
  AddTeamMember
);
