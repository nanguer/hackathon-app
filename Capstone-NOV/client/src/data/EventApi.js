import axios from 'axios';

export default class EventApi {
  constructor() {
    const BASE_URL = process.env.BASE_URL;
  }

  static getEvents(cb) {
    const BASE_URL = process.env.BASE_URL;
    axios
      .get(`${BASE_URL}/event`, { crossDomain: true })
      .then(response => cb(response.data))
      .catch(error => {
        throw error;
      });
  }

  static getEventById(eventId) {
    axios
      .get(`${BASE_URL}/event/edit/` + eventId, { crossDomain: true })
      .then(response => {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  static deleteEvent(eventId, cb, route) {
    const BASE_URL = process.env.BASE_URL;
    console.log('In issue Delete.....' + eventId);
    axios.delete(`${BASE_URL}/event/` + eventId).then(
      response => {
        cb(route);
      },
      error => {
        console.log(error);
      }
    );
  }
}
