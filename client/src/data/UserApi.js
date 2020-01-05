import axios from "axios";

export default class UserApi {
	constructor() {
		const BASE_URL = process.env.BASE_URL;
	}
	static getUsers(cb) {
		const BASE_URL = process.env.BASE_URL;
		axios
			.get(`${BASE_URL}/users/`, { crossDomain: true })
			.then(response => cb(response.data))
			.catch(error => {
				throw error;
			});
	}

	static getUserById(userId) {
		const BASE_URL = process.env.BASE_URL;
		axios
			.get(`${BASE_URL}/users/edit/` + userId, { crossDomain: true })

			.then(response => {
				console.log(response);
			})
			.catch(function(error) {
				console.log(error);
			});
	}

	static addEvent(eventData) {
		const BASE_URL = process.env.BASE_URL;
		let newEvent = {
			title: eventData.title,
			description: eventData.description,
			severity: eventData.severity,
			status: eventData.status,
			createdDate: eventData.createdDate,
			resolvedDate: eventData.resolvedDate
		};
		axios.post(`${BASE_URL}/users/`, newEvent).then(
			response => {
				console.log(response);
			},
			error => {
				console.log(error);
			}
		);
	}

	static editUser(user, userId, cb, route) {
		const BASE_URL = process.env.BASE_URL;
		axios.put(`${BASE_URL}/users/` + userId, user).then(
			res => {
				cb(route);
			},
			error => {
				console.log(error);
			}
		);
	}

	static deleteUser(userId, cb, route) {
		const BASE_URL = process.env.BASE_URL;
		axios
			.delete(`${BASE_URL}/users/` + userId)
			.then(response => {
				cb(route);
			})
			.catch(e => {
				console.log(e);
			});
	}
	static getUserId(userId) {
		const BASE_URL = process.env.BASE_URL;
		axios
			.get(`${BASE_URL}/users/edit/` + userId, { crossDomain: true })

			.then(response => {
				console.log(response);
				return response.data.firstname;
			})
			.catch(function(error) {
				console.log(error);
			});
	}
}
