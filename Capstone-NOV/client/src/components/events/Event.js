import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

export class Event extends React.Component {
	render() {
		const { id, title, status, location, auth } = this.props;
		const editpath = `/edit/${id}`;
		const deletepath = `/delete/${id}`;
		const detailpath = `/details/${id}`;
		const ideasPath = `/event/${id}/ideas`;

		const evaluatorOptions = (
			<td>
				<Link to={ideasPath}>View Ideas</Link>
			</td>
		);

		const modifyEventOptions = (
			<td style={{ display: "flex", justifyContent: "space-between" }}>
				<Link to={editpath}>Edit</Link>
				{this.props.auth.isAdmin && <Link to={deletepath}>Delete</Link>}
			</td>
		);

		return (
			<tr>
				<td>{title}</td>
				<td>{status}</td>
				<td>{location}</td>
				<td>
					<Link to={detailpath}>Details</Link>
				</td>
				{auth.isAdmin && modifyEventOptions}
				{auth.user.type !== "HH" && evaluatorOptions}
				{!auth.isAdmin && auth.user.type === "HH" && modifyEventOptions}
			</tr>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(Event);
