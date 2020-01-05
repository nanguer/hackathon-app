import React from "react";
import Event from "./Event";

const EventList = ({ events, ...props }) => {
	var eventNodes = events.map((event, i) => (
		<Event
			key={i}
			id={event._id}
			title={event.title}
			status={event.status}
			startDate={event.startDate}
			endDate={event.endDate}
			location={event.location}
		/>
	));
	return (
		<div>
			<table className="table table-responsive-md table-borderless">
				<thead>
					<tr>
						<th>Title</th>
						<th>Status</th>
						<th>Location</th>
						<th></th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody>{eventNodes}</tbody>
			</table>
		</div>
	);
};

export default EventList;
