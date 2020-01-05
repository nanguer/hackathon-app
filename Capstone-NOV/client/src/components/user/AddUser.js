import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { registerUser } from "../../actions/authentication";
import classnames from "classnames";
import moment from "moment";

export class AddUser extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.myChangeHandler = this.myChangeHandler.bind(this);
		this.onBackClick = this.onBackClick.bind(this);
		this.state = {
			isAdmin: Boolean,
			firstname: String,
			lastname: String,
			email: String,
			doj: String,
			password: "",
			password_confirm: "",
			errors: {},
			userType: "SELECT"
		};
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.auth.isAdmin ? null : this.props.history.push("/");
		}
		this.setState({ isAdmin: this.props.auth.isAdmin });
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	}

	handleSubmit(event) {
		event.preventDefault();
		let backRoute = "";
		this.props.auth.isAdmin
			? (backRoute = "/users")
			: (backRoute = "/login");
		//console.log(JSON.stringify(this.state));
		let newUser = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			password: this.state.password,
			password_confirm: this.state.password_confirm,
			email: this.state.email,
			doj: this.state.doj,
			userType: this.state.userType
		};

		this.props.registerUser(newUser, this.props.history, backRoute);
	}

	myChangeHandler(event) {
		let nam = event.target.name;
		let val = event.target.value;
		this.setState({ [nam]: val });
		// console.log(nam+":"+val);
	}
	onBackClick() {
		this.props.history.goBack();
	}

	render() {
		const defaultDoj = moment(Date.now()).format("YYYY-MM-DD");
		const { errors } = this.state;
		return (
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

				<form onSubmit={this.handleSubmit}>
					<div className="form-row">
						<div className="form-group col-md-12">
							<input
								className={classnames(
									"form-control cust-input",
									{
										"is-invalid": errors.firstName
									}
								)}
								placeholder="First Name"
								type="text"
								name="firstName"
								onChange={this.myChangeHandler}
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
								className={classnames(
									"form-control cust-input",
									{
										"is-invalid": errors.lastName
									}
								)}
								type="text"
								placeholder="Last Name"
								name="lastName"
								onChange={this.myChangeHandler}
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
								className={classnames(
									"form-control cust-input",
									{
										"is-invalid": errors.email
									}
								)}
								type="text"
								name="email"
								placeholder="Email"
								onChange={this.myChangeHandler}
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
								className={classnames(
									"form-control cust-input",
									{
										"is-invalid": errors.password
									}
								)}
								type="password"
								name="password"
								placeholder="Password"
								onChange={this.myChangeHandler}
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
								className={classnames(
									"form-control cust-input",
									{
										"is-invalid": errors.password_confirm
									}
								)}
								type="password"
								name="password_confirm"
								placeholder="Confirm password"
								onChange={this.myChangeHandler}
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
								onChange={this.myChangeHandler}
							/>
							{errors.doj && (
								<div className="invalid-feedback">
									{errors.doj}
								</div>
							)}
						</div>

						<div className="form-group col-md-6 col-6 ">
							<label>User Type :</label>
							<select
								className={classnames("form-control", {
									"is-invalid": errors.userType
								})}
								value={this.state.userType}
								name="userType"
								onChange={this.myChangeHandler}
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
						<button
							className="btn btn-dark"
							onClick={this.onBackClick}
						>
							Back
						</button>
						<button className="btn btn-primary" type="submit">
							Add User!
						</button>
					</div>
				</form>
			</div>
		);
	}
}

AddUser.propTypes = {
	registerUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	errors: state.errors,
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ registerUser }
)(withRouter(AddUser));
