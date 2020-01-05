import React from "react";

const TeamMember = ({ id, firstName, lastName, email, mobile, ...props }) => {
	// const teamDetailsPath = `/teamDetails/${id}`;
	// const addTeamPath = `/addTeam/${id}`;
	// const editTeamPath = `/editTeam/${id}`
	const style = {
		wordBreak: "break-word"
	};
	return (
		<tr>
			<td>{firstName}</td>
			<td>{lastName}</td>
			<td style={style}>{email}</td>
			<td style={style}>{mobile}</td>
		</tr>
	);
};

export default TeamMember;
