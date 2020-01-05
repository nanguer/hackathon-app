import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

export const EventIdea = ({ idea, ...props }) => {
  const handleEvaluate = (id, name) => {
    props.history.push({ pathname: "/evaluateIdea", state: { name, id } });
  };

  const { ideaSubject, ideaSummary, teamName, teamSize, evaluated, _id } = idea;

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title" style={{ fontWeight: 800 }}>
          {ideaSubject}
        </h5>
        <h6>Team Name: {teamName}</h6>
        <h6>Size: {teamSize}</h6>
        <h6>Summary: {ideaSummary}</h6>
        {idea.score && (
          <h6 style={{ color: "#33ca7f", fontWeight: 700 }}>
            Score: {idea.score}
          </h6>
        )}
      </div>
      <div
        className="mb-2"
        style={{ display: "flex", justifyContent: "center" }}
      >
        {props.auth.user.type === "HE" ? (
          <button
            onClick={() => handleEvaluate(_id, ideaSubject)}
            className="btn btn-primary btn-sm"
            style={{ width: "fit-content" }}
            disabled={evaluated}
          >
            Evaluate{evaluated && "d"}
          </button>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(EventIdea));
