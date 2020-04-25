import {
  SET_CURRENT_USER,
  USER_LOADING,
  FETCH_PROJECT,
} from '../actions/types';

const isEmpty = require('is-empty');

const initialState = {
  isAuthenticated: false,
  user: {
    projects: [],
  },
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PROJECT:
      return {
        ...state,
        user: {
          ...state.user,
          projects: action.payload,
        },
      };
    default:
      return state;
  }
};

export default authReducer;
