import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER, SET_ADMIN, ADD_TEAM } from "./types";
import setAuthToken from "../setAuthToken";
import jwt_decode from "jwt-decode";

const BASE_URL = process.env.BASE_URL;

export const registerUser = (user, history, route) => dispatch => {
	axios
		.post(`${BASE_URL}/users/create`, user)
		.then(res => history.push(route))
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};

export const loginUser = user => dispatch => {
	axios
		.post(`${BASE_URL}/users/login`, user)
		.then(res => {
			const { token } = res.data;
			localStorage.setItem("jwtToken", token);
			setAuthToken(token);
			const decoded = jwt_decode(token);
			dispatch(setCurrentUser(decoded));
		})

		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};

export const loginUserFb = user => dispatch => {
	axios
		.post(`${BASE_URL}/users/fblogin`, user)
		.then(res => {
			dispatch(setCurrentUser(res.data));
		})
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};

export const loginAdmin = admin => dispatch => {
	axios
		.post(`${BASE_URL}/admin/login`, admin)
		.then(res => {
			const { token } = res.data;
			localStorage.setItem("jwtToken", token);
			setAuthToken(token);
			const decoded = jwt_decode(token);
			dispatch(setAdmin(decoded));
		})
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};

export const setAdmin = decoded => {
	return {
		type: SET_ADMIN,
		payload: decoded
	};
};

export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	};
};

export const logoutUser = (history, pushBack) => dispatch => {
	localStorage.removeItem("jwtToken");
	setAuthToken(false);
	dispatch(setCurrentUser({}));
	dispatch(setAdmin({}));
	if (pushBack) {
		history.push("/login");
	}
};

export const registerTeam = (team, history) => dispatch => {
	axios
		.post(`${BASE_URL}/participant/register`, team)
		.then(res => {
			dispatch(updateUserTeams(res.data._id));
			history.push("/userEvents");
		})
		.catch(err => {
			console.log(err);
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};

export const updateUserTeams = teamId => {
	return {
		type: ADD_TEAM,
		payload: teamId
	};
};
