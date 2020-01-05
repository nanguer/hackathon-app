import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const ParticipantEvent = ({
	title,
	status,
	location,
	id,
	participant,
	usersId,
	...props
}) => {
	const registerPath = `/register/${id}/${title}/${participant}`;
	const detailsPath = `/details/${id}`;

	const notShowRegister = () => {
		for (let userId of usersId) {
			if (userId === props.auth.user.id) {
				return true;
			}
		}
	};

	return (
		<tr>
			<td>
				<Link className="details-link" to={detailsPath}>{title}</Link>
			</td>
			<td>{status}</td>
			<td>{location}</td>
			<td>
				{notShowRegister() ? (
					<a to="#" className="disabled">
						Already registered
					</a>
				) : (
					<Link className="btn btn-success btn-sm" to={registerPath}>
						Register
					</Link>
				)}
			</td>
		</tr>
	);
};

const mapStateToProps = state => ({
	auth: state.auth,
	allEvents: state.event.allEvents
});
export default connect(mapStateToProps)(ParticipantEvent);
