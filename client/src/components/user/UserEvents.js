import React, { useEffect, useState } from "react";
import axios from "axios";
import EventList from "../events/EventList";
import EventApi from "../../data/EventApi";
import ParticipantEventList from "../participant/ParticipantEventList";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { checkUserType } from "../../actions/user";
import { setAllEvents } from "../../actions/event";
import AbsoluteWrapper from "../AbsoluteWrapper";

const UserEvents = ({ user, auth, setAllEvents, ...props }) => {
	const [state, setState] = useState({
		events: [],
		filterEvents: [],
		user: {}
	});

	const BASE_URL = process.env.BASE_URL;

	useEffect(() => {
		let hostvalue;
		if (!auth.isAuthenticated) {
			props.history.push("/login");
		} else {
			auth.isAdmin
				? (hostvalue = props.match.params.id)
				: (hostvalue = user.id);

			const fetchData = async () => {
				const user = await axios.get(
					`${BASE_URL}/users/getUser/` + hostvalue
				);
				const userData = user.data;

				switch (userData.userType) {
					case "HH":
						const fetchHH = async () => {
							const eventsArr = await axios.get(
								`${BASE_URL}/event/getHostEvents/` + hostvalue,
								{ crossDomain: true }
							);
							setState({
								...state,
								user: userData,
								events: eventsArr.data,
								filterEvents: eventsArr.data
							});
						};
						fetchHH();
						break;

					case "HE":
						const fetchHE = async () => {
							const eventsArr = await axios.get(
								`${BASE_URL}/event/getEvaluatorsEvents/` +
									hostvalue,
								{ crossDomain: true }
							);
							setState({
								...state,
								user: userData,
								events: eventsArr.data,
								filterEvents: eventsArr.data
							});
						};
						fetchHE();
						break;

					case "HP":
						EventApi.getEvents(data => {
							const eventArr = data.map(event => {
								return {
									id: event._id,
									teams: event.teams
								};
							});
							setAllEvents(eventArr);
							setState({
								...state,
								user: userData,
								events: data,
								filterEvents: data,
								participantId: auth.user.id
							});
						});

					default:
						null;
				}
			};
			fetchData();
		}
	}, []);

	const onBackClick = () => {
		props.history.push("/users");
	};

	const filterEvents = e => {
		let allEvents = state.filterEvents;
		let initialEvents = state.events;

		allEvents = allEvents.filter(event => {
			return (
				event.title
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

	const subtitle = {
		HE: "evaluate",
		HP: "enroll!!"
	};
	const { name, type } = user;
	const { isAdmin } = auth;
	const { firstName, lastName } = state.user;
	const { events, participantId } = state;
	const teameventpath = `/teamEvents/${participantId}`;
	const userType = checkUserType(type);

	return (
		<AbsoluteWrapper>
			<div
				className="container justify-content-center align-content-center"
				style={{ marginTop: "50px" }}
			>
				{!isAdmin ? (
					<div className="justify-content-center">
						<h1
							className="font-bold text-center"
							style={{ marginBottom: "20px" }}
						>
							Hackathon {userType} Home
						</h1>
					</div>
				) : (
					<div>
						<h1>Welcome {isAdmin ? "Admin" : name}</h1>
						<h4>
							Now viewing {`${firstName} ${lastName}'s `} events
						</h4>
					</div>
				)}
				{!isAdmin ? (
					<div className="mb-3">
						{type === "HH" ? (
							<div className="justify-content-center">
								<h3 className="text-center">Your Events: </h3>
							</div>
						) : (
							<div className="justify-content-center">
								<h3 className="text-center">
									List of available events to {subtitle[type]}
								</h3>
							</div>
						)}
					</div>
				) : null}

				<div className="mb-3 mt-4">
					<label>Search by title:</label>
					<input
						className="searchField ml-3"
						type="text"
						placeholder="Search"
						onChange={filterEvents}
					/>
				</div>

				{events.length > 0 ? (
					userType === "Participant" ? (
						<ParticipantEventList
							events={events}
							participant={participantId}
						/>
					) : (
						<EventList events={events} />
					)
				) : (
					<div style={{ textAlign: "center" }}>
						Nothing to see here...
					</div>
				)}

				{type === "HP" ? (
					<div>
						<br />
						<Link className="btn btn-info" to={teameventpath}>
							My Events
						</Link>{" "}
						<br />
					</div>
				) : null}

				{type === "HH" ? (
					<div>
						<br />
						<Link className="btn btn-primary" to="/addEvent">
							Add Event
						</Link>
					</div>
				) : null}

				{isAdmin ? (
					<button className="btn btn-secondary" onClick={onBackClick}>
						Back
					</button>
				) : null}
			</div>
		</AbsoluteWrapper>
	);
};

const mapStateToProps = state => ({
	user: state.auth.user,
	auth: state.auth
});

export default connect(mapStateToProps, { setAllEvents })(
	withRouter(UserEvents)
);
