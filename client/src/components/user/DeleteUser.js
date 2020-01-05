import React, { useEffect } from "react";
import UserApi from "../../data/UserApi";

const DeleteUser = ({ id, ...props }) => {
	useEffect(() => {
		UserApi.deleteUser(props.match.params.id, props.history.push, "/users");
	}, []);

	return false;
};

export default DeleteUser;
