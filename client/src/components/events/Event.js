import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

export const Event = ({ id, title, status, location, auth, ...props }) => {
	const editpath = `/edit/${id}`;
	const deletepath = `/delete/${id}`;
	const detailpath = `/details/${id}`;
	const ideasPath = `/event/${id}/ideas`;

	const evaluatorOptions = (
		<td>
			<Link className="btn btn-success btn-sm" to={ideasPath}>
				View Ideas
			</Link>
		</td>
	);

	const modifyEventOptions = (
		<td style={{ display: "flex", justifyContent: "space-between" }}>
			<Link className="btn btn-warning btn-sm" to={editpath}>
				Edit
			</Link>
			{auth.isAdmin && (
				<Link className="btn btn-danger btn-sm" to={deletepath}>
					Delete
				</Link>
			)}
		</td>
	);

	return (
		<tr>
			<td>{title}</td>
			<td>{status}</td>
			<td>{location}</td>
			<td>
				<Link className="btn btn-info btn-sm" to={detailpath}>
					Details
				</Link>
			</td>
			{auth.isAdmin && modifyEventOptions}
			{auth.user.type !== "HH" && evaluatorOptions}
			{!auth.isAdmin && auth.user.type === "HH" && modifyEventOptions}
		</tr>
	);
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(Event);
