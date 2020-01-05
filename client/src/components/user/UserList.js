import React from "react";
import User from "./User";

const UserList = ({ users }) => {
	const userNodes = users.map((user, i) => (
		<User
			key={i}
			id={user._id}
			firstName={user.firstName}
			lastName={user.lastName}
			email={user.email}
			doj={user.date}
			userType={user.userType}
			userid={user.userid}
		/>
	));
	return (
		<div>
			<table className="table table-responsive-md table-borderless">
				<thead>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
						<th>Date of Joining</th>
						<th>User Type</th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody>{userNodes}</tbody>
			</table>
		</div>
	);
};

export default UserList;
