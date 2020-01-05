import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { registerUser } from "../../actions/authentication";
import { resetErrors } from "../../actions/event";
import classnames from "classnames";
import moment from "moment";
import AbsoluteWrapper from "../AbsoluteWrapper";

const AddUser = ({ auth, registerUser, resetErrors, ...props }) => {
	const [state, setState] = useState({
		isAdmin: Boolean,
		firstname: String,
		lastname: String,
		email: String,
		doj: String,
		password: "",
		password_confirm: "",
		errors: {},
		userType: "SELECT"
	});

	useEffect(() => {
		resetErrors({});
		if (auth.isAuthenticated) {
			auth.isAdmin ? null : props.history.push("/");
		}
		setState({
			...state,
			isAdmin: auth.isAdmin
		});
	}, []);

	useEffect(() => {
		setState({
			...state,
			errors: props.errors
		});
	}, [props.errors]);

	const handleSubmit = e => {
		e.preventDefault();
		let backRoute = "";
		auth.isAdmin ? (backRoute = "/users") : (backRoute = "/login");
		const {
			firstName,
			lastName,
			password,
			password_confirm,
			email,
			doj,
			userType
		} = state;

		const newUser = {
			firstName,
			lastName,
			password,
			password_confirm,
			email,
			doj,
			userType
		};

		registerUser(newUser, props.history, backRoute);
	};

	const myChangeHandler = e => {
		let nam = e.target.name;
		let val = e.target.value;
		setState({
			...state,
			[nam]: val
		});
	};
	const onBackClick = () => {
		props.history.goBack();
	};

	const defaultDoj = moment(Date.now()).format("YYYY-MM-DD");
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
					Add Hackathon User
				</h1>
			</div>

			<form onSubmit={handleSubmit}>
				<div className="form-row">
					<div className="form-group col-md-12">
						<input
							className={classnames("form-control cust-input", {
								"is-invalid": errors.firstName
							})}
							placeholder="First Name"
							type="text"
							name="firstName"
							onChange={myChangeHandler}
						/>
						{errors.firstName && (
							<div className="invalid-feedback">
								{errors.firstName}
							</div>
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
							placeholder="Last Name"
							name="lastName"
							onChange={myChangeHandler}
						/>
						{errors.lastName && (
							<div className="invalid-feedback">
								{errors.lastName}
							</div>
						)}
					</div>
				</div>

				<div className="form-row">
					<div className="form-group col-md-12">
						<input
							className={classnames("form-control cust-input", {
								"is-invalid": errors.email
							})}
							type="text"
							name="email"
							placeholder="Email"
							onChange={myChangeHandler}
						/>
						{errors.email && (
							<div className="invalid-feedback">
								{errors.email}
							</div>
						)}
					</div>
				</div>

				<div className="form-row">
					<div className="form-group col-md-12">
						<input
							className={classnames("form-control cust-input", {
								"is-invalid": errors.password
							})}
							type="password"
							name="password"
							placeholder="Password"
							onChange={myChangeHandler}
						/>
						{errors.password && (
							<div className="invalid-feedback">
								{errors.password}
							</div>
						)}
					</div>
				</div>
				<div className="form-row">
					<div className="form-group col-md-12">
						<input
							className={classnames("form-control cust-input", {
								"is-invalid": errors.password_confirm
							})}
							type="password"
							name="password_confirm"
							placeholder="Confirm password"
							onChange={myChangeHandler}
						/>
						{errors.password_confirm && (
							<div className="invalid-feedback">
								{errors.password_confirm}
							</div>
						)}
					</div>
				</div>

				<div className="form-row justify-content-center">
					<div className="form-group col-md-6 col-6">
						<label>Date Of Joning :</label>
						<input
							className={classnames("form-control", {
								"is-invalid": errors.doj
							})}
							type="date"
							name="doj"
							defaultValue={defaultDoj}
							onChange={myChangeHandler}
						/>
						{errors.doj && (
							<div className="invalid-feedback">{errors.doj}</div>
						)}
					</div>

					<div className="form-group col-md-6 col-6 ">
						<label>User Type :</label>
						<select
							className={classnames("form-control", {
								"is-invalid": errors.userType
							})}
							value={state.userType}
							name="userType"
							onChange={myChangeHandler}
						>
							<option></option>
							<option value="HH">Host</option>
							<option value="HE">Evaluator</option>
							<option value="HP">Participant</option>
						</select>
						{errors.userType && (
							<div className="invalid-feedback">
								{errors.userType}
							</div>
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
						Add User!
					</button>
				</div>
			</form>
		</div>
		</AbsoluteWrapper>
	);
};

AddUser.propTypes = {
	registerUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	errors: state.errors,
	auth: state.auth
});

export default connect(mapStateToProps, { registerUser, resetErrors })(
	withRouter(AddUser)
);
