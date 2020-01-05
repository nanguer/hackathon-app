import React, { useState, useEffect } from "react";
import axios from "axios";
import Options from "../Options";
import PlacesWrapper from "../PlacesWrapper";
import moment from "moment";
import { connect } from "react-redux";
import { addEvent, resetErrors } from "../../actions/event";
import classnames from "classnames";

export const AddEvent = ({
	addEvent,
	resetErrors,
	auth,
	history,
	errors,
	...props
}) => {
	const [eventData, setEventData] = useState({
		errors: {},
		title: "",
		description: "",
		status: "",
		startDate: "",
		endDate: "",
		latLng: [],
		hosts: [],
		evaluator: "",
		optionValues: [],
		evaluators: []
	});
	const [location, setLocation] = useState("");
	const [host, setHost] = useState("");

	useEffect(() => {
		resetErrors({});
		const BASE_URL = process.env.BASE_URL;

		if (!auth.isAuthenticated) {
			history.push("/login");
		} else {
			const defaultDate = moment(Date.now()).format("YYYY-MM-DD");
			axios
				.get(`${BASE_URL}/users/getHosts/`, { crossDomain: true })
				.then(response => {
					setEventData({
						...eventData,
						hosts: response.data
					});
				})
				.catch(function(error) {
					console.log(error);
				});
			axios
				.get(`${BASE_URL}/users/getEvaluators/`, { crossDomain: true })
				.then(response => {
					// console.log(response.data);
					setEventData({
						...eventData,
						evaluators: response.data
					});
				})
				.catch(function(error) {
					console.log(error);
				});

			if (auth.user.type === "HH") {
				setHost(auth.user.id);
			}
		}
	}, []);

	useEffect(() => {
		setEventData({
			...eventData,
			errors
		});
	}, [errors]);

	const myChangeHandler = event => {
		let nam = event.target.name;
		let val = event.target.value;
		setEventData({
			...eventData,
			[nam]: val
		});
		// console.log(nam+":"+val);
	};
	const onBackClick = () => {
		history.goBack();
	};

	const getLocation = location => {
		setLocation(location);
	};

	const getLatLng = latLng => {
		setEventData({
			...eventData,
			latLng
		});
	};

	const handleSubmit = event => {
		event.preventDefault();
		let backRoute = "";
		auth.isAdmin ? (backRoute = "/events") : (backRoute = "/userEvents");
		const {
			title,
			description,
			status,
			startDate,
			endDate,
			latLng,
			evaluator
		} = eventData;
		const newEvent = {
			title,
			description,
			status,
			host,
			startDate,
			endDate,
			location,
			latLng,
			evaluator
		};
		addEvent(newEvent, history, backRoute);
	};

	// const { errors } = eventData;
	const { type } = auth.user;

	const hostSelect = (
		<div className="form-group col-md-6">
			<label>Host :</label>
			<select
				value={eventData.host}
				name="host"
				onChange={myChangeHandler}
				className={classnames("form-control", {
					"is-invalid": errors.host
				})}
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
			{errors.evaluator && (
				<div className="invalid-feedback">{errors.evaluator}</div>
			)}
		</div>
	);

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
					Add Event
				</h1>
			</div>

			<form onSubmit={handleSubmit}>
				<div className="form-row">
					<div className="form-group col-md-12">
						<input
							className={classnames("form-control cust-input", {
								"is-invalid": errors.title
							})}
							placeholder="Title"
							type="text"
							name="title"
							onChange={myChangeHandler}
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
							onChange={myChangeHandler}
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
						<label>Status :</label>
						<select
							value={eventData.status}
							name="status"
							onChange={myChangeHandler}
							className={classnames("form-control", {
								"is-invalid": errors.status
							})}
						>
							<option value="Open">Open</option>
							<option value="In Progress">In Progress</option>
							<option value="Closed">Closed</option>
						</select>
						{errors.startDate && (
							<div className="invalid-feedback">
								{errors.status}
							</div>
						)}
					</div>

					<div className="form-group col-12 col-sm-6 col-xs-6 col-md-6">
						<label>Location :</label>
						<div
							style={{ width: "min-content", padding: 0 }}
							className={classnames("cust-input", {
								"is-invalid": errors.location
							})}
						>
							<PlacesWrapper
								location={getLocation}
								latLng={getLatLng}
								defaultLocation={""}
							/>
						</div>
						{errors.location && (
							<div className="invalid-feedback location-invalid">
								{errors.location}
							</div>
						)}
					</div>
				</div>

				<div className="form-row">
					<div className="form-group col-12 col-sm-6 col-xs-6 col-md-6">
						<label>Start Date :</label>
						<input
							className={classnames("form-control", {
								"is-invalid": errors.startDate
							})}
							type="date"
							name="startDate"
							onChange={myChangeHandler}
						/>
						{errors.startDate && (
							<div className="invalid-feedback">
								{errors.startDate}
							</div>
						)}
					</div>
					<div className="form-group col-12 col-sm-6 col-xs-6 col-md-6">
						<label>End Date :</label>
						<input
							className={classnames("form-control", {
								"is-invalid": errors.endDate
							})}
							type="date"
							name="endDate"
							onChange={myChangeHandler}
						/>
						{errors.endDate && (
							<div className="invalid-feedback">
								{errors.endDate}
							</div>
						)}
					</div>
				</div>

				{type !== "HH" && hostSelect}

				<div className="form-group col-md-6">
					<label>Evaluators : </label>
					<select
						className={classnames("form-control", {
							"is-invalid": errors.evaluator
						})}
						value={eventData.evaluator}
						name="evaluator"
						onChange={myChangeHandler}
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
				<div
					className="form-row justify-content-around"
					style={{ marginTop: "10px" }}
				>
					<button
						className="btn btn-secondary"
						type="button"
						onClick={onBackClick}
					>
						Back
					</button>
					<button className="btn btn-primary" type="submit">
						Add Event
					</button>
				</div>
			</form>
		</div>
	);
};

const mapStateToProps = state => ({
	errors: state.errors,
	auth: state.auth
});

export default connect(mapStateToProps, { addEvent, resetErrors })(AddEvent);
