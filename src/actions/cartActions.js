import axios from 'axios';
import { 
  ADD_TO_CART, 
  REMOVE_ITEM_CART, 
  EMPTY_CART,
  SAVE_SHIPPING_INFO,
  LOAD_USER_CART,
  LOAD_USER_SHIPPING_INFO,
  TOGGLE_CART_OVERLAY } from '../constants/cartConstants';

import store from '../store';

// const API = 'https://csp3-ecommercev2.herokuapp.com';
// const API = 'https://youthful-jones-4f9fef.netlify.app/';
// const API = 'http://localhost:4000';


export const toggleCart = () => async (dispatch, getState) => {
  dispatch({
    type: TOGGLE_CART_OVERLAY
  })
}

export const addItemToCart = (id, quantity, user) => async (dispatch, getState) => {
  
  const token = await store.getState().auth.token;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }
  // const { data } = await axios.get(`${API}/api/products/${id}`, config);
  // const { data } = await axios.get(`http://localhost:4000/api/products/${id}`, config);
  // const { data } = await axios.get(`/api/products/${id}`, config);
  const { data } = await axios.get(`https://csp3-ecommercev2.herokuapp.com/api/products/${id}`, config);



  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
      quantity
    }
  })

  localStorage.setItem(`cartItems-${user._id}`, JSON.stringify(getState().cart.cartItems));
}

export const removeItemFromCart = (id, user) => async (dispatch, getState) => {

  dispatch({
    type: REMOVE_ITEM_CART,
    payload: id
  })

  localStorage.setItem(`cartItems-${user._id}`, JSON.stringify(getState().cart.cartItems));
}

export const emptyCart = (user) => async (dispatch, getState) => {

  dispatch({ type: EMPTY_CART });
  localStorage.setItem(`cartItems-${user._id}`, JSON.stringify([]));
}

export const saveShippingInfo = (data, user) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data
  })

  localStorage.setItem(`shippingInfo-${user._id}`, JSON.stringify(data));
}

export const loadShippingInfo = (user) => async (dispatch) => {
  let shippingInfo = user && localStorage.getItem(`shippingInfo-${user._id}`);
  shippingInfo = shippingInfo || '{}';

  console.log('shippingInfo : ', shippingInfo);
  dispatch({
    type: LOAD_USER_SHIPPING_INFO,
    payload: JSON.parse(shippingInfo)
  })
}

export const loadCartItems = (user) => async (dispatch) => {
  let cartItems = user && localStorage.getItem(`cartItems-${user._id}`);
  cartItems = cartItems || '[]';

  console.log('cartItems : ', cartItems);
  dispatch({
    type: LOAD_USER_CART,
    payload: JSON.parse(cartItems)
  })
}
