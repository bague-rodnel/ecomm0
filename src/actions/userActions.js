import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  NEW_PASSWORD_REQUEST,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_ERRORS  
} from '../constants/userConstants';

import axios from 'axios';

import { EMPTY_CART } from '../constants/cartConstants';
import { loadCartItems, loadShippingInfo } from './cartActions';

import store from '../store';


const API = 'https://csp3-api-v1.herokuapp.com';
// const API = 'https://youthful-jones-4f9fef.netlify.app/';
// const API = 'http://localhost:4000';



// login 
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    // const { data } = await axios.post(`http://localhost:4000/api/users/login`, { email, password }, config);
    // const { data } = await axios.post(`${API}/api/users/login`, { email, password }, config);
    // const { data } = await axios.post(`https://csp3-api-v1.herokuapp.com/api/users/login`, { email, password }, config);
    const { data } = await axios.post(`https://csp3-ecommercev2.herokuapp.com/api/users/login`, { email, password }, config);

    localStorage.setItem('token', data.token);

    dispatch({ 
      type: LOGIN_SUCCESS,
      payload: data
    });

    // dispatch(loadCartItems(data.user));
    // dispatch(loadShippingInfo(data.user));
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message
    })
  }
}

// register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    // const config = {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // }
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    // const { data } = await axios.post(`${API}/api/users/register`, userData, config)
    // const { data } = await axios.post(`http://localhost:4000/api/users/register`, userData, config)
    const { data } = await axios.post(`https://csp3-ecommercev2.herokuapp.com/api/users/register`, userData, config)

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data.success
    })

  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message
    })
  }
}
 
// load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const token = await store.getState().auth.token;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }

    // const { data } = await axios.get(`${API}/api/users/me`, config);
    // const { data } = await axios.get(`http://localhost:4000/api/users/me`, config);
    const { data } = await axios.get(`https://csp3-ecommercev2.herokuapp.com/api/users/me`, config);


    data.token = token;

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data
    })

    dispatch(loadCartItems(data.user));
    dispatch(loadShippingInfo(data.user));
 
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL
      // payload: error.response.data.message
    })
  }
}

// get all users
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });

    const token = await store.getState().auth.token;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }

    // const { data } = await axios.get(`${API}/api/users`, config);
    // const { data } = await axios.get(`http://localhost:4000/api/users`, config);
    const { data } = await axios.get(`https://csp3-ecommercev2.herokuapp.com/api/users`, config);

    dispatch({
      type: ALL_USERS_SUCCESS,
      payload: data.users
    })
 
  } catch (error) {
    dispatch({
      type: ALL_USERS_FAIL,
      payload: error.response.data.message
    })
  }
}



// logout
export const logout = () => async (dispatch) => {
  try {

    // await axios.get(`${API}/api/users/logout`);
    dispatch({ 
      type: LOGOUT_SUCCESS
    })
    dispatch({ 
      type: EMPTY_CART
    })

    localStorage.removeItem('token');
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.message
    })
  }
}

// update profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const token = await store.getState().auth.token;

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`

      }
    }

    // const { data } = await axios.put(`${API}/api/users/me/update`, userData, config)
    // const { data } = await axios.put(`http://localhost:4000/api/users/me/update`, userData, config)
    const { data } = await axios.put(`https://csp3-ecommercev2.herokuapp.com/api/users/me/update`, userData, config)


    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.success
    })

  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message
    })
  }
}

// update password
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const token = await store.getState().auth.token;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }

    // const { data } = await axios.put(`${API}/api/users/password/update`, passwords, config)
    // const { data } = await axios.put(`http://localhost:4000/api/users/password/update`, passwords, config)
    const { data } = await axios.put(`https://csp3-ecommercev2.herokuapp.com/api/users/password/update`, passwords, config)



    dispatch({
      type: UPDATE_PASSWORD_SUCCESS,
      payload: data.success
    })

  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message
    })
  }
}

// forgot password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    // const { data } = await axios.post(`${API}/api/users/password/forgot`, email, config)
    // const { data } = await axios.post(`http://localhost:4000/api/users/password/forgot`, email, config)
    const { data } = await axios.post(`https://csp3-ecommercev2.herokuapp.com/api/users/password/forgot`, email, config)



    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data.message
    })

  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message
    })
  }
}

// reset password
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PASSWORD_REQUEST });

    // const token = await store.getState().auth.token;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }

    // const { data } = await axios.put(`${API}/api/users/password/reset/${token}`, passwords, config)
    const { data } = await axios.put(`https://csp3-ecommercev2.herokuapp.com/api/users/password/reset/${token}`, passwords, config)


    dispatch({
      type: NEW_PASSWORD_SUCCESS,
      payload: data.success
    })

  } catch (error) {  
    dispatch({
      type: NEW_PASSWORD_FAIL,
      payload: error.response.data.message
    })
  }
}

// update user (ADMIN)
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    
    const token = await store.getState().auth.token;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }

    // const { data } = await axios.put(`${API}/api/users/${id}`, userData, config)
    const { data } = await axios.put(`https://csp3-ecommercev2.herokuapp.com/api/users/${id}`, userData, config)


    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data.success
    })

  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL
      // ,
      // payload: error.response.data.message
    })
  }
}

// get user details (ADMIN)
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const token = await store.getState().auth.token;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }

    // const { data } = await axios.get(`${API}/api/users/${id}`, config);
    const { data } = await axios.get(`https://csp3-ecommercev2.herokuapp.com/api/users/${id}`, config);


    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data.user
    })

  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL
      // ,
      // payload: error.response.data.message
    })
  }
}

// delete user  (ADMIN)
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const token = await store.getState().auth.token;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }

    // const { data } = await axios.delete(`${API}/api/users/${id}`, config);
    const { data } = await axios.delete(`https://csp3-ecommercev2.herokuapp.com/api/users/${id}`, config);


    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: data.success
    })

  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.message
    })
  }
}

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS
  })
}
