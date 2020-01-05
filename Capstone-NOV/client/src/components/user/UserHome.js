import React from "react";
import UserList from "./UserList";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UserApi from "../../data/UserApi";

export class UserHome extends React.Component {
	constructor(props) {
		super(props);
		this.filterEvents = this.filterEvents.bind(this);
		this.state = {
			users: [],
			filterUsers: []
		};
	}
	componentDidMount() {
		this.props.auth.isAdmin
			? UserApi.getUsers(data =>
					this.setState({ users: data, filterUsers: data })
			  )
			: this.props.history.goBack();
	}

	filterEvents(e) {
		let allUsers = this.state.filterUsers;
		let initialUsers = this.state.users;
		allUsers = allUsers.filter(user => {
			return (
				user.firstName
					.toLowerCase()
					.search(e.target.value.toLowerCase()) !== -1
			);
		});
		if (e.target.value.length <= 0) {
			this.setState({ users: initialUsers });
		}
		this.setState({ users: allUsers });
	}

	render() {
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
							onChange={this.filterEvents}
						/>
					</label>
				</div>
				<UserList users={this.state.users} />
				<br />
				<Link to="/addUser">Add User</Link>
				<br />
				<br />
				<Link to="/events">Event Home</Link>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(UserHome);
