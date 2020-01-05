import React from "react";
import RegisterdEvent from "./RegisterdEvent";

const RegisteredEventList = ({ events }) => {
	var eventNodes = events.map((event, i) => (
		<RegisterdEvent
			key={i}
			id={event._id}
			eventName={event.event.title}
			teamName={event.teamName}
			teamSize={event.teamSize}
			ideaSubject={event.ideaSubject}
			ideaSummary={event.ideaSummary}
			participant={event.participant}
		/>
	));
	return (
		<div>
			<table className="table table-responsive table-borderless">
				<thead>
					<tr>
						<th>Event</th>
						<th>Team Name</th>
						<th>Team Size</th>
						<th>Idea</th>
						<th></th>
					</tr>
				</thead>
				<tbody>{eventNodes}</tbody>
			</table>
		</div>
	);
};

export default RegisteredEventList;
