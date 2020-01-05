import React, { useState, useEffect } from "react";
import EventList from "./EventList";
import EventApi from "../../data/EventApi";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

export const EventHome = props => {
	const [state, setState] = useState({
		events: [],
		filteredEvents: []
	});

	useEffect(() => {
		if (!props.authState.isAdmin) {
			props.history.push("/admin/login");
		} else {
			EventApi.getEvents(data =>
				setState({ events: data, filterEvents: data })
			);
		}
	}, []);

	const filterEvents = e => {
		let allEvents = state.filterEvents;
		let initialEvents = state.events;
		allEvents = allEvents.filter(event => {
			return (
				event.description
					.toLowerCase()
					.search(e.target.value.toLowerCase()) !== -1
			);
		});

		if (e.target.value.length <= 0) {
			setState({
				...state,
				events: initialEvents
			});
		}
		setState({
			...state,
			events: allEvents
		});
	};
	return (
		<div>
			<h1>Hackathon Events Home</h1>
			<div>
				<label>
					Search by :{" "}
					<input
						type="text"
						placeholder="Search"
						onChange={filterEvents}
					/>
				</label>
			</div>
			<EventList events={state.events} />
			<br />
			<Link to="/addEvent">Add Event</Link>
			<br />
			<Link to="/users">Hackathon User Management</Link>
		</div>
	);
};

const mapStateToProps = state => ({
	authState: state.auth
});

export default connect(mapStateToProps)(EventHome);
