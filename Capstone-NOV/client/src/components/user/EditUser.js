import React from "react";
import axios from "axios";
import moment from "moment";
import UserApi from "../../data/UserApi";
import { connect } from "react-redux";
import { checkUserType } from "../../actions/user";

export class EditUserPage extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onBackClick = this.onBackClick.bind(this);
		this.state = {
			user: "",
			firstName: String,
			lastName: String,
			email: String,
			doj: String,
			userType: String,
			userId: this.props.match.params.id
		};
	}
	componentDidMount() {
		const BASE_URL = process.env.BASE_URL;
		axios
			.get(`${BASE_URL}/users/edit/` + this.props.match.params.id, {
				crossDomain: true
			})
			.then(response => {
				this.setState({
					user: response.data,
					firstName: response.data.firstName,
					lastName: response.data.lastName,
					email: response.data.email,
					doj: moment(response.data.doj).format("YYYY-MM-DD"),
					userType: response.data.userType
				});
			})
			.catch(function(error) {
				console.log(error);
			});
	}

	handleChange(e) {
		e.preventDefault();
		let nam = e.target.name;
		let val = e.target.value;
		this.setState({ [nam]: val });
	}
	handleSubmit(e) {
		let user = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			email: this.state.email,
			doj: this.state.doj,
			userType: this.state.userType
		};
		UserApi.editUser(user, this.props.match.params.id);
		this.props.history.push("/users");
	}
	onBackClick(event) {
		event.preventDefault();
		this.props.history.push("/users");
	}
	render() {
		const { firstName, lastName, userType, email, doj } = this.state;
		let user = checkUserType(userType);

		return (
			<div
				className="container justify-content-center align-content-center"
				style={{ maxWidth: "400px", marginTop: "50px" }}
			>
				<h1
					className="font-bold text-center"
					style={{ marginBottom: "40px" }}
				>
					Editing {firstName} {lastName}
				</h1>
				<form onSubmit={this.handleSubmit}>
					<div className="form-row">
						<div className="form-group col-md-12">
							<label>First Name : </label>
							<input
								type="text"
								name="firstName"
								defaultValue={firstName}
								onChange={this.handleChange}
							/>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-12">
							<label>Last Name : </label>
							<input
								type="text"
								name="lastName"
								defaultValue={lastName}
								onChange={this.handleChange}
							/>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-12">
							<label>Email : </label>
							<input
								type="text"
								name="email"
								defaultValue={email}
								onChange={this.handleChange}
							/>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-12">
							<label>Date Of Joining : </label>
							<input
								type="date"
								name="doj"
								defaultValue={doj}
								onChange={this.handleChange}
							/>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-12">
							<label>User Type : </label>
							<select
								value={userType}
								name="userType"
								onChange={this.handleChange}
							>
								<option value="HH">Host</option>
								<option value="HE">Evaluator</option>
								<option value="HP">Participant</option>
							</select>
						</div>
					</div>
					<div
						className="form-row justify-content-around"
						style={{ marginTop: "10px" }}
					>
						<button className="btn btn-primary" type="submit">
							Edit {user}
						</button>
						<button
							className="btn btn-dark"
							type="button"
							onClick={this.onBackClick}
						>
							Back
						</button>
					</div>
				</form>
				<br />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(EditUserPage);
