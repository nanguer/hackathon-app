import axios from 'axios';
import {
  GET_ERRORS,
  SET_IDEAS,
  ERASE_IDEA,
  SET_ALL_EVENTS
} from '../actions/types';

const BASE_URL = process.env.BASE_URL;

export const getEventIdeas = id => dispatch => {
  axios
    .get(`${BASE_URL}/event/${id}/ideas`)
    .then(res => {
      const event = { name: res.data.description, ideas: res.data.teams };
      dispatch(setEvent(event));
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const setEvent = event => {
  return {
    type: SET_IDEAS,
    payload: event
  };
};

export const eraseIdea = () => {
  return {
    type: ERASE_IDEA
  };
};

export const addEvent = (newEvent, history, backRoute) => dispatch => {
  axios
    .post(`${BASE_URL}/event/create`, newEvent, {
      crossDomain: true
    })
    .then(res => {
      history.push(backRoute);
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const evaluateIdea = (ideaId, score, history, backroute) => dispatch => {
  axios
    .post(`${BASE_URL}/event/idea/evaluate/${ideaId}`, score)
    .then(res => {
      history.push(backroute);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const setAllEvents = events => dispatch => {
  dispatch({
    type: SET_ALL_EVENTS,
    payload: events
  });
};

export const resetErrors = (payload) => dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload
  });
};


export const editEvent = (eventId, event, history, backRoute) => dispatch => {
  axios
    .put(`${BASE_URL}/event/` + eventId, event)
    .then(res => {
      history.push(backRoute);
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

