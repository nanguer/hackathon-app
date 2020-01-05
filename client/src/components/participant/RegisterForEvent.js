import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { registerTeam } from "../../actions/authentication";
import classnames from "classnames";
import { resetErrors } from "../../actions/event";
import AbsoluteWrapper from "../AbsoluteWrapper";

const RegisterForEvent = ({ registerTeam, resetErrors, ...props }) => {
  const [state, setState] = useState({
    eventId: "",
    teamName: "",
    teamSize: "",
    ideaSubject: "",
    ideaSummary: "",
    errors: {}
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
    const teamDetail = {
      event: props.match.params.id,
      teamName: state.teamName,
      teamSize: state.teamSize,
      ideaSubject: state.ideaSubject,
      ideaSummary: state.ideaSummary,
      participant: props.match.params.participant
    };

    registerTeam(teamDetail, props.history);
  };
  const onBackClick = e => {
    e.preventDefault();
    props.history.push("/userEvents");
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
            Team Event Registration
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group col-md-12 justify-content-center">
            <h5 className="text-center"> Event Name: </h5>
            <p className="text-center">
              <strong>{props.match.params.description}</strong>
            </p>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <input
                className={classnames("form-control cust-input", {
                  "is-invalid": errors.teamName
                })}
                type="text"
                name="teamName"
                placeholder="Team Name"
                defaultValue={state.teamName}
                onChange={handleChange}
              />
              {errors.teamName && (
                <div className="invalid-feedback">{errors.teamName}</div>
              )}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <input
                className={classnames("form-control cust-input", {
                  "is-invalid": errors.teamSize
                })}
                type="number"
                name="teamSize"
                placeholder="Team Size (number!)"
                defaultValue={state.teamSize}
                onChange={handleChange}
              />
              {errors.teamSize && (
                <div className="invalid-feedback">{errors.teamSize}</div>
              )}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <input
                className={classnames("form-control cust-input", {
                  "is-invalid": errors.ideaSubject
                })}
                placeholder="Idea Title"
                type="text"
                name="ideaSubject"
                defaultValue={state.ideaSubject}
                onChange={handleChange}
              />
              {errors.ideaSubject && (
                <div className="invalid-feedback">{errors.ideaSubject}</div>
              )}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <textarea
                className={classnames("form-control cust-input", {
                  "is-invalid": errors.ideaSubject
                })}
                name="ideaSummary"
                defaultValue={state.ideaSummary}
                onChange={handleChange}
                placeholder="Insert idea summary..."
              />
              {errors.ideaSummary && (
                <div className="invalid-feedback">{errors.ideaSummary}</div>
              )}
            </div>
          </div>
          <div
            className="form-row justify-content-around"
            style={{ marginTop: "10px" }}
          >
            <button
              type="button"
              className="btn btn-secondary btn-anim"
              onClick={onBackClick}
            >
              Back
            </button>
            <button className="btn btn-primary btn-anim" type="submit">
              Submit your Idea!
            </button>
          </div>
        </form>
      </div>
    </AbsoluteWrapper>
  );
};

const mapStateToProps = state => ({
  authState: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerTeam, resetErrors })(
  RegisterForEvent
);
