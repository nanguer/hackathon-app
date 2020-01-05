import React from "react";
import UserApi from "../../data/UserApi";

export default class DeleteUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: String
		};
	}
	componentDidMount() {
		UserApi.deleteUser(this.props.match.params.id);
		this.props.history.push("/users");
	}

	render() {
		console.log(this.props.match.params.id);
		return false;
	}
}
