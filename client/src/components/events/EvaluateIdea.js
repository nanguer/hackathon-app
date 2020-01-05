import React, { Component, useState, useEffect } from "react";
import { evaluateIdea } from "../../actions/event";
import { connect } from "react-redux";
import classnames from "classnames";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import AbsoluteWrapper from "../AbsoluteWrapper";

export const EvaluateIdea = ({ errors, evaluateIdea, ...props }) => {
	const [evaluation, setEvaluation] = useState({
		score: "",
		name: "",
		id: "",
		errors: {}
	});

	const handleChange = e => {
		let { value, min, max } = e.target;
		value = Math.max(Number(min), Math.min(Number(max), Number(value)));

		setEvaluation({
			...evaluation,
			score: value
		});
	};

	const confirm = () => {
		confirmAlert({
			title: "Evaluate idea",
			message: "Are you sure you want to send the score ?",
			buttons: [
				{
					label: "Send score!",
					onClick: handleSubmit
				},
				{
					label: "No",
					onClick: () => null
				}
			]
		});
	};

	useEffect(() => {
		setEvaluation({
			...evaluation,
			errors
		});
	}, [errors]);

	const handleSubmit = () => {
		const { id, score } = evaluation;
		const scoreObj = { score: score + "" };
		evaluateIdea(id, scoreObj, props.history, "/userEvents");
	};

	useEffect(() => {
		setEvaluation({
			...evaluation,
			id: props.location.state.id,
			name: props.location.state.name
		});
	}, []);

	const handleBack = () => {
		props.history.goBack();
	};

	const { name } = evaluation;
	return (
		<AbsoluteWrapper>
			<div
				className="container justify-content-center align-content-center"
				style={{ maxWidth: "400px", marginTop: "50px" }}
			>
				<div className="justify-content-center">
					<h1
						className="font-bold text-center"
						style={{ marginBottom: "2vh" }}
					>
						Evaluating Idea:
					</h1>
					<h2 className="text-center" style={{ marginBottom: "5vh" }}>
						{name}
					</h2>
				</div>

				<h3 className="text-center">Score: </h3>
				<form onSubmit={handleSubmit}>
					<div className="form-row" style={{ textAlign: "center" }}>
						<div className="form-group justify-content-center col-md-12">
							<input
								className={classnames(
									"form-control cust-input",
									{
										"is-invalid": errors.score
									}
								)}
								name="score"
								type="number"
								value={evaluation.score}
								onChange={handleChange}
								min-="0"
								max="100"
							/>
							%
							{errors.score && (
								<div className="invalid-feedback">
									{errors.score}
								</div>
							)}
							<small className="form-text text-muted">
								Please enter rating from 1 to 100
							</small>
						</div>
					</div>
				</form>
				<div
					className="form-row justify-content-around"
					style={{ marginTop: "10px" }}
				>
					<button className="btn btn-success" onClick={confirm}>
						Send!
					</button>

					<button className="btn btn-primary" onClick={handleBack}>
						Back
					</button>
				</div>
			</div>
		</AbsoluteWrapper>
	);
};

const mapStateToProps = state => ({
	errors: state.errors
});

export default connect(mapStateToProps, { evaluateIdea })(EvaluateIdea);
