import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { checkUserType } from "../../actions/user";

const User = ({ id, firstName, lastName, doj, userType, email, ...props }) => {
	const editpath = `editUser/${id}`;
	const deletepath = `deleteUser/${id}`;
	const eventspath = `userEvents/${id}`;

	return (
		<tr>
			<td>{firstName}</td>
			<td>{lastName}</td>
			<td>{email}</td>
			<td>{moment(doj).format("DD-MM-YYYY")}</td>
			<td>{checkUserType(userType)}</td>
			<td>
				<Link className="btn btn-info btn-sm" to={eventspath}>
					Events
				</Link>
			</td>
			<td>
				<Link className="btn btn-warning btn-sm" to={editpath}>
					Edit
				</Link>
			</td>
			<td>
				<Link className="btn btn-danger btn-sm" to={deletepath}>
					Delete
				</Link>
			</td>
		</tr>
	);
};

export default User;
