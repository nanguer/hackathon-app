import { SET_IDEAS, SET_EVENT_NAME, ERASE_IDEA, SET_ALL_EVENTS } from '../actions/types';

const initialState = {
  allEvents:[],
  name: '',
  ideas: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_IDEAS:
      return {
        name: action.payload.name,
        ideas: action.payload.ideas
      };
    case ERASE_IDEA:
      return {
        name: '',
        ideas: []
      };
    case SET_ALL_EVENTS:
      return {
        ...state,
        allEvents: action.payload
      }
    
    default:
      return state;
  }
}
