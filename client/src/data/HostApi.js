import axios from 'axios';

export default class HostApi {
  static getHosts(cb) {
    const BASE_URL = process.env.BASE_URL;
    axios
      .get(`${BASE_URL}/users/`, { crossDomain: true })
      .then(response => cb(response.data))
      .catch(error => {
        throw error;
      });
  }
}
