import axios from 'axios';
import { GET_ERRORS } from '../actions/types';

const BASE_URL = process.env.BASE_URL;

export const addTeamMember = (
  teamDetail,
  history,
  route,
  teamName
) => dispatch => {
  //   const teamData = ({
  //     firstName,
  //     lastName,
  //     email,
  //     mobile,
  //     participant
  //   } = teamDetail);
  axios
    .post(`${BASE_URL}/team/create`, teamDetail)
    .then(res => {
      history.push({
        pathname: route,
        state: { teamName }
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
