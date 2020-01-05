import { SET_CURRENT_USER, SET_ADMIN, ADD_TEAM } from '../actions/types';
import isEmpty from '../is-empty';

const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  user: {
    teams: []
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:

      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case SET_ADMIN:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        isAdmin: !isEmpty(action.payload)
      };
    case ADD_TEAM:
      const newTeam = [action.payload];
      return {
        ...state,
        user: {
          ...state.user,
          teams: state.user.teams.concat(newTeam)
        }
      };
    default:
      return state;
  }
}
