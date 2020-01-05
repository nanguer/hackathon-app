import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import RegisteredEventList from "./RegisteredEventList";
import AbsoluteWrapper from "../AbsoluteWrapper";

const ParticipantEventDetails = props => {
	const [state, setState] = useState({
		events: [],
		filteredEvents: []
	});

	useEffect(() => {
		const BASE_URL = process.env.BASE_URL;
		axios
			.get(
				`${BASE_URL}/participant/getEventsByParticipantId/` +
					props.match.params.id,
				{
					crossDomain: true
				}
			)
			.then(response => {
				setState({
					events: response.data,
					filterEvents: response.data
				});
			})
			.catch(function(error) {
				console.log(error);
			});
	}, []);

	const onBackClick = () => {
		props.history.push("/userEvents");
	};

	const filterEvents = e => {
		let allEvents = state.filterEvents;
		let initialEvents = state.events;
		allEvents = allEvents.filter(event => {
			return (
				event.teamName
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

	const { user } = props.auth;
	const { events } = state;

	return (
		<AbsoluteWrapper>
			<div
				className="container justify-content-center align-content-center"
				style={{ marginTop: "50px" }}
			>
				<div className="container row justify-content-center">
					<h1 className="font-bold text-center">
						Welcome {user.name}
					</h1>
				</div>

				<h2 className="text-center">These are your current events:</h2>
				<div className="mb-3 mt-4">
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
				<div>
					{events.length > 0 ? (
						<RegisteredEventList events={events} />
					) : (
						<div style={{ textAlign: "center" }}>
							Nothing to see here...
						</div>
					)}
				</div>

				<button className="btn btn-secondary" onClick={onBackClick}>
					Back
				</button>
			</div>
		</AbsoluteWrapper>
	);
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(ParticipantEventDetails);
