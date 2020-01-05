import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import UserApi from "../../data/UserApi";
import { connect } from "react-redux";
import { checkUserType } from "../../actions/user";

const EditUserPage = props => {
	const [state, setState] = useState({
		user: "",
		firstName: "",
		lastName: "",
		email: "",
		doj: "",
		userType: "",
		userId: props.match.params.id
	});

	const { firstName, lastName, email, doj, userType, userId } = state;

	useEffect(() => {
		const BASE_URL = process.env.BASE_URL;
		const fetchUser = async () => {
			try {
				const res = await axios.get(
					`${BASE_URL}/users/edit/` + props.match.params.id,
					{
						crossDomain: true
					}
				);
				const { firstName, lastName, email, doj, userType } = res.data;
				setState({
					user: res.data,
					firstName,
					lastName,
					email,
					doj: moment(doj).format("YYYY-MM-DD"),
					userType
				});
			} catch (e) {
				console.log(e);
			}
		};
		fetchUser();
	}, []);

	const handleChange = e => {
		e.preventDefault();
		let nam = e.target.name;
		let val = e.target.value;
		setState({ ...state, [nam]: val });
	};
	const handleSubmit = e => {
		e.preventDefault();
		let user = {
			firstName,
			lastName,
			email,
			doj,
			userType
		};
		UserApi.editUser(
			user,
			props.match.params.id,
			props.history.push,
			"/users"
		);
	};
	const onBackClick = e => {
		e.preventDefault();
		props.history.push("/users");
	};
	let userTag = checkUserType(userType);

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
			<form onSubmit={handleSubmit}>
				<div className="form-row">
					<div className="form-group col-md-12">
						<label>First Name : </label>
						<input
							type="text"
							name="firstName"
							defaultValue={firstName}
							onChange={handleChange}
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
							onChange={handleChange}
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
							onChange={handleChange}
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
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className="form-row">
					<div className="form-group col-md-12">
						<label>User Type : </label>
						<select
							value={userType}
							name="userType"
							onChange={handleChange}
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
						Edit {userTag}
					</button>
					<button
						className="btn btn-secondary"
						type="button"
						onClick={onBackClick}
					>
						Back
					</button>
				</div>
			</form>
			<br />
		</div>
	);
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(EditUserPage);
