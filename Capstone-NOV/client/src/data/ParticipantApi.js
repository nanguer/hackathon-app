import axios from 'axios';
import { GET_ERRORS } from '../actions/types';

export default class ParticipantApi {
  static getUsers(cb) {
    const BASE_URL = process.env.BASE_URL;
    // return JSON.parse(JSON.stringify(EventData.events));
    axios
      .get(`${BASE_URL}/users/`, { crossDomain: true })
      .then(response => cb(response.data))
      .catch(error => {
        throw error;
      });
  }

  static getUserById(userId) {
    const BASE_URL = process.env.BASE_URL;
    console.log('In Issue by id >>>>>>>>>' + userId);
    axios
      .get(`${BASE_URL}/users/edit/` + userId, { crossDomain: true })

      .then(response => {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  // static registerTeam(teamData, cb, path) {
  //   let registerTeam = {

  //     eventId: teamData.eventId,
  //     teamName: teamData.teamName,
  //     teamSize: teamData.teamSize,
  //     ideaSubject: teamData.ideaSubject,
  //     ideaSummary: teamData.ideaSummary,
  //     participant: teamData.participant
  //   };
  //   axios
  //     .post('http://localhost:5000/participant/register', registerTeam)
  //     .then(response => {
  //       if (response.status === 200) {
  //         cb(path)
  //       }
  //     }).catch(err => {
  //       console.log(err)
  //     })
  // }
  static addTeamMember(teamDetails) {
    let teamData = {
      firstName: teamDetails.firstName,
      lastName: teamDetails.lastName,
      email: teamDetails.email,
      mobile: teamDetails.mobile,
      participant: teamDetails.participant
    };
    axios.post('http://localhost:5000/team/create', teamData).then(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  static editUser(user, userId) {
    console.log('In edit issue: ' + user);
    console.log('In edit issue: ' + userId);
    axios.put('http://localhost:5000/users/' + userId, user).then(
      response => {
        console.log(response);
        //cb(route);
      },
      error => {
        console.log(error);
      }
    );
  }

  static deleteUser(userId) {
    console.log('In issue Delete.....' + userId);
    axios.delete('http://localhost:5000/users/' + userId).then(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }
  static getUserId(userId) {
    console.log('In Issue by id >>>>>>>>>' + userId);
    axios
      .get('http://localhost:5000/users/edit/' + userId, { crossDomain: true })

      .then(response => {
        console.log(response);
        return response.data.firstname;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}
