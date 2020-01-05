import React from "react";
import TeamMember from "./TeamMember";

const TeamMembersList = ({ members }) => {
	const memberNodes = members.map((member, i) => (
		<TeamMember
			key={i}
			id={member._id}
			firstName={member.firstName}
			lastName={member.lastName}
			email={member.email}
			mobile={member.mobile}
		/>
	));

	return (
		<div>
			<table className="table table-responsive table-borderless">
				<thead>
					<tr>
						<th>Frist Name</th>
						<th>Last Name</th>
						<th>Email</th>
						<th>Mobile</th>
					</tr>
				</thead>
				<tbody>{memberNodes}</tbody>
			</table>
		</div>
	);
};

export default TeamMembersList;
