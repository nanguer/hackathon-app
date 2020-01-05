import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import EventApi from "../../data/EventApi";
import ParticipantEventList from "./ParticipantEventList";

const ParticipantHome = ({ auth, ...props }) => {
	const [state, setState] = useState({
		events: [],
		filteredEvents: [],
		participantId: ""
	});

	useEffect(() => {
		if (!auth.isAuthenticated) {
			props.history.push("/login");
		} else {
			if (!(auth.user.type === "HP") && !auth.isAdmin) {
				props.history.push("/error");
			} else {
				EventApi.getEvents(data =>
					setState({
						events: data,
						filterEvents: data,
						participantId: auth.user.id
					})
				);
			}
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
				events: initialEvents
			});
		}
		setState({
			events: allEvents
		});
	};
	const teameventpath = `/teamEvents/${state.participantId}`;
	const { events } = state;
	return (
		<div>
			<h1>Hackathon Participant Home</h1>
			<div>
				<label>
					Search by :{" "}
					<input
						className="searchField ml-3"
						type="text"
						placeholder="Search"
						onChange={filterEvents}
					/>
				</label>
			</div>
			{events.length > 0 ? (
				<ParticipantEventList
					events={state.events}
					participant={state.participantId}
				/>
			) : (
				<div style={{ textAlign: "center" }}>
					Nothing to see here...
				</div>
			)}

			<br />
			<Link className="btn" to={teameventpath}>
				My Events
			</Link>
			<br />
		</div>
	);
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(ParticipantHome);
