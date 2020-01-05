import React from "react";
import { Link } from "react-router-dom";

const RegisterdEvent = ({
	id,
	teamName,
	teamSize,
	ideaSubject,
	eventName,
	...props
}) => {
	const teamDetailsPath = `/teamDetails/${id}`;
	// const addTeamPath = `/addTeam/${props.id}`;
	// const editTeamPath = `/editTeam/${props.id}`;

	return (
		<tr>
			<td>{eventName}</td>
			<td>{teamName}</td>
			<td>{teamSize}</td>
			<td>{ideaSubject}</td>
			<td>
				<Link
					className="btn btn-info btn-sm"
					to={{
						pathname: teamDetailsPath,
						state: { teamName }
					}}
				>
					Team Details
				</Link>
			</td>
		</tr>
	);
};

export default RegisterdEvent;
