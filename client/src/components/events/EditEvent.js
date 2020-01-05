import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Options from "../Options";
import PlacesWrapper from "../PlacesWrapper";
import { connect } from "react-redux";
import { editEvent, resetErrors } from "../../actions/event";
import classnames from "classnames";

export const EditEvent = ({ editEvent, errors, resetErrors, ...props }) => {
	const [eventData, setEventData] = useState({
		title: "",
		description: "",
		status: "",
		startDate: "",
		endDate: "",
		location: "",
		eventid: props.match.params.id,
		host: "",
		evaluator: "",
		hosts: [],
		evaluators: [],
		errors: {}
	});
	let eventsRoute;

	useEffect(() => {
		return setEventData({
			...eventData,
			errors
		});
	}, [errors]);

	useEffect(() => {
		resetErrors({});
		const BASE_URL = process.env.BASE_URL;
		async function fetchEventData() {
			const res = await axios.get(
				`${BASE_URL}/event/edit/` + props.match.params.id,
				{
					crossDomain: true
				}
			);

			const fetchedEvaluators = await axios.get(
				`${BASE_URL}/users/getEvaluators/`,
				{
					crossDomain: true
				}
			);

			const fetchedHost = await axios.get(`${BASE_URL}/users/getHosts/`, {
				crossDomain: true
			});

			setEventData({
				...eventData,
				title: res.data.title,
				description: res.data.description,
				status: res.data.status,
				startDate: moment(res.data.startDate).format("YYYY-MM-DD"),
				endDate: moment(res.data.endDate).format("YYYY-MM-DD"),
				location: res.data.location,
				host: res.data.host,
				evaluator: res.data.evaluator,
				latLng: res.data.latLng,
				evaluators: fetchedEvaluators.data,
				hosts: fetchedHost.data
			});
		}
		fetchEventData();
	}, []);

	const handleChange = e => {
		let nam = e.target.name;
		let val = e.target.value;
		setEventData({
			...eventData,
			[nam]: val
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		const { isAdmin } = props.auth;
		isAdmin ? (eventsRoute = "/events") : (eventsRoute = "/userEvents");
		const { match, history } = props;
		const {
			title,
			description,
			status,
			startDate,
			endDate,
			location,
			host,
			evaluator,
			latLng
		} = eventData;
		let event1 = {
			title,
			description,
			status,
			startDate,
			endDate,
			location,
			host,
			evaluator,
			latLng
		};

		editEvent(match.params.id, event1, history, eventsRoute);
	};
	const onBackClick = event => {
		event.preventDefault();
		const { isAdmin } = props.auth;
		isAdmin ? (eventsRoute = "/events") : (eventsRoute = "/userEvents");
		props.history.push(eventsRoute);
	};
	const getLocation = location => {
		setEventData({ location });
	};
	const getLatLng = latLng => {
		setEventData({
			latLng
		});
	};
	const hostSelect = (
		<div className="form-row">
			<div className="form-group col-6 col-md-6">
				<label>Hosts : </label>
				<select
					className={classnames("form-control", {
						"is-invalid": errors.evaluator
					})}
					value={eventData.host}
					name="host"
					onChange={handleChange}
				>
					<option />
					{eventData.hosts.map((optionValue, i) => {
						return (
							<Options
								key={i}
								id={optionValue._id}
								optionValue={
									optionValue.firstName +
									" " +
									optionValue.lastName
								}
							/>
						);
					})}
				</select>
				{errors.host && (
					<div className="invalid-feedback">{errors.host}</div>
				)}
			</div>
		</div>
	);
	// const { errors } = eventData;
	const { type } = props.auth.user;

	return (
		<div
			className="container justify-content-center align-content-center"
			style={{
				maxWidth: "400px",
				marginTop: "50px",
				marginBottom: "20px"
			}}
		>
			<div className="justify-content-center">
				<h1
					className="font-bold text-center"
					style={{ marginBottom: "40px" }}
				>
					Edit Event
				</h1>
			</div>

			<form onSubmit={handleSubmit}>
				<div className="form-row">
					<div className="form-group col-md-12">
						<input
							className={classnames("form-control cust-input", {
								"is-invalid": errors.title
							})}
							type="text"
							name="title"
							defaultValue={eventData.title}
							onChange={handleChange}
						/>
						{errors.title && (
							<div className="invalid-feedback">
								{errors.title}
							</div>
						)}
					</div>
				</div>

				<div className="form-row">
					<div className="form-group col-md-12">
						<textarea
							style={{ height: "150px" }}
							className={classnames("form-control", {
								"is-invalid": errors.description
							})}
							type="text"
							name="description"
							placeholder="Description"
							defaultValue={eventData.description}
							onChange={handleChange}
						></textarea>
						{errors.description && (
							<div className="invalid-feedback">
								{errors.description}
							</div>
						)}
					</div>
				</div>

				<div className="form-row">
					<div className="form-group col-12 col-sm-6 col-xs-6 col-md-6">
						<label>Status: </label>
						<select
							value={eventData.status}
							name="status"
							onChange={handleChange}
							className={classnames("form-control", {
								"is-invalid": errors.status
							})}
						>
							<option value="Open">Open</option>
							<option value="In Progress">In Progress</option>
							<option value="Closed">Closed</option>
						</select>
					</div>
					<div className="form-group col-12 col-sm-6 col-xs-6 col-md-6">
						<div
							style={{ display: "flex", flexDirection: "column" }}
						>
							<label>Location : </label>
							<div
								style={{ width: "min-content", padding: 0 }}
								className={classnames("cust-input", {
									"is-invalid": errors.location
								})}
							>
								<PlacesWrapper
									defaultLocation={eventData.location}
									location={getLocation}
									latLng={getLatLng}
								/>
							</div>
							{errors.location && (
								<div className="invalid-feedback">
									{errors.location}
								</div>
							)}
						</div>
					</div>
				</div>

				<div className="form-row">
					<div className="form-group col-12 col-sm-6 col-xs-6 col-md-6">
						<label>Start Date : </label>
						<input
							className={classnames("form-control", {
								"is-invalid": errors.startDate
							})}
							type="date"
							name="startDate"
							defaultValue={eventData.startDate}
							onChange={handleChange}
						/>
						{errors.startDate && (
							<div className="invalid-feedback">
								{errors.startDate}
							</div>
						)}
					</div>

					<div className="form-group col-12 col-sm-6 col-xs-6 col-md-6">
						<label>End Date : </label>
						<input
							className={classnames("form-control", {
								"is-invalid": errors.endDate
							})}
							type="date"
							name="endDate"
							defaultValue={eventData.endDate}
							onChange={handleChange}
						/>
						{errors.endDate && (
							<div className="invalid-feedback">
								{errors.endDate}
							</div>
						)}
					</div>
				</div>

				{type !== "HH" && hostSelect}

				<div className="form-row">
					<div className="form-group col-6 col-md-6">
						<label>Evaluators :</label>
						<select
							className={classnames("form-control", {
								"is-invalid": errors.evaluator
							})}
							value={eventData.evaluator}
							name="evaluator"
							onChange={handleChange}
						>
							<option />
							{eventData.evaluators.map((optionValue, i) => (
								<Options
									key={i}
									id={optionValue._id}
									optionValue={
										optionValue.firstName +
										" " +
										optionValue.lastName
									}
								/>
							))}
						</select>
						{errors.evaluator && (
							<div className="invalid-feedback">
								{errors.evaluator}
							</div>
						)}
					</div>
				</div>

				<div
					className="form-row justify-content-around"
					style={{ marginTop: "10px" }}
				>
					<button className="btn btn-primary" type="submit">
						Edit Event
					</button>
					<button
						className="btn btn-secondary"
						type="button"
						onClick={onBackClick}
					>
						Back
					</button>
				</div>
			</form>
		</div>
	);
};

const mapStateToProps = eventData => ({
	auth: eventData.auth,
	errors: eventData.errors
});

export default connect(mapStateToProps, { editEvent, resetErrors })(EditEvent);
