import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import {
  GET_ERRORS,
  USER_LOADING,
  SET_CURRENT_USER,
  FETCH_PROJECT,
} from './types';

//Register user
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post('/api/users/register', userData)
    .then((res) => {
      history.push('/login');
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

//Login-get user token
export const loginUser = (userData, history) => (dispatch) => {
  axios
    .post('/api/users/login', userData)
    .then((res) => {
      //Save to local storage

      //Set token to local storage
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      history.push('/home');
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Set Initial user
export const setInitialUser = () => (dispatch) => {
  // get data from local storage
  const token = localStorage.getItem('jwtToken');
  if (token === null) {
    return;
  }
  // decode
  const decode = jwt_decode(token);
  //call setCurrentUser
  dispatch(setCurrentUser(decode));
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

// Log user out
export const logoutUser = (history) => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  history.push('/');
};

//Get all the project details for current user
export const getProject = (userId) => (dispatch) => {
  axios.post('/api/projects/display-project', { userId }).then(({ data }) => {
    dispatch({ type: FETCH_PROJECT, payload: data.projects });
  });
};

//Add project to database
export const addProject = (projectDetails, history) => (dispatch) => {
  axios
    .post('/api/projects/add-project', projectDetails)
    .then((res) => {
      history.push('/home');
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
