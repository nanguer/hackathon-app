import React, { useState, useEffect } from "react";
import UserList from "./UserList";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UserApi from "../../data/UserApi";

const UserHome = props => {
	const [state, setState] = useState({
		users: [],
		filterUsers: []
	});

	useEffect(() => {
		props.auth.isAdmin
			? UserApi.getUsers(data =>
					setState({ ...state, users: data, filterUsers: data })
			  )
			: props.history.goBack();
	}, []);

	const filterEvents = e => {
		let allUsers = state.filterUsers;
		let initialUsers = state.users;
		allUsers = allUsers.filter(user => {
			return (
				user.firstName
					.toLowerCase()
					.search(e.target.value.toLowerCase()) !== -1
			);
		});
		if (e.target.value.length <= 0) {
			setState({ ...state, users: initialUsers });
		}
		setState({ ...state, users: allUsers });
	};
	return (
		<div
			className="container justify-content-center align-content-center"
			style={{ marginTop: "40px" }}
		>
			<h1>Hackathon User Home</h1>
			<div>
				<label>
					Search by :{" "}
					<input
						type="text"
						placeholder="Search"
						onChange={filterEvents}
					/>
				</label>
			</div>
			<UserList users={state.users} />
			<br />
			<Link className="btn btn-primary" to="/addUser">
				Add User
			</Link>
			<br />
			<br />
			<Link className="btn btn-info" to="/events">
				Event Home
			</Link>
		</div>
	);
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(UserHome);
