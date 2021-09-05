import axios from 'axios';

import {
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_FAIL,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_REQUEST,
  MY_ORDERS_FAIL,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_FAIL,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_FAIL,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_FAIL,
  CLEAR_ERRORS
} from '../constants/orderConstants';

import store from '../store';

const API = 'https://csp3-api-v1.herokuapp.com';
// const API = 'https://youthful-jones-4f9fef.netlify.app/';
// const API = 'http://localhost:4000';




export const createOrder = (order) => async (dispatch)  => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const token = await store.getState().auth.token;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }

    // const { data } = await axios.post(`${API}/api/orders/`, order, config);
    // const { data } = await axios.post(`http://localhost:4000/api/orders/`, order, config);
      const { data } = await axios.post(`/api/orders/`, order, config);



    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data.order
    })
  } catch (error) {
    dispatch( { 
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message
    })
  }
}

export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_REQUEST });

    const token = await store.getState().auth.token;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }

    // const { data } = await axios.get(`${API}/api/orders/me`, config);
    // const { data } = await axios.get(`http://localhost:4000/api/orders/me`, config);
    const { data } = await axios.get(`/api/orders/me`, config);


     
    dispatch({
      type: MY_ORDERS_SUCCESS,
      payload: data.orders
    })
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: error.response.data.message
    })
  }
}

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const token = await store.getState().auth.token;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }

    // const { data } = await axios.get(`${API}/api/orders/${id}`, config);
    // const { data } = await axios.get(`http://localhost:4000/api/orders/${id}`, config);
    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data.order
    })
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message
    })
  }
}

// ADMIN
export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });

    const token = await store.getState().auth.token;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }

    // const { data } = await axios.get(`${API}/api/orders`, config);
    // const { data } = await axios.get(`http://localhost:4000/api/orders`, config);
    const { data } = await axios.get(`/api/orders`, config);


    dispatch({
      type: ALL_ORDERS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: error.response.data.message
    })
  }
}

export const updateOrder = (id, orderData) => async (dispatch)  => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    const token = await store.getState().auth.token;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }


    // const { data } = await axios.put(`${API}/api/orders/${id}`, orderData, config);
    // const { data } = await axios.put(`http://localhost:4000/api/orders/${id}`, orderData, config);
    const { data } = await axios.put(`/api/orders/${id}`, orderData, config);



    dispatch({
      type: UPDATE_ORDER_SUCCESS,
      payload: data.success
    })

  } catch (error) {
    dispatch({ 
      type: UPDATE_ORDER_FAIL,
      payload: error.response.data.message
    })
  }
}

export const deleteOrder = (id) => async (dispatch)  => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });

    const token = await store.getState().auth.token;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }


    // const { data } = await axios.delete(`${API}/api/orders/${id}`, config);
    // const { data } = await axios.delete(`http://localhost:4000/api/orders/${id}`, config);
    const { data } = await axios.delete(`/api/orders/${id}`, config);


    dispatch({
      type: DELETE_ORDER_SUCCESS,
      payload: data.success
    })

  } catch (error) {
    dispatch({ 
      type: DELETE_ORDER_FAIL,
      payload: error.response.data.message
    })
  }
}

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS
  })
}
