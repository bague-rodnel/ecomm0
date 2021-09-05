import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { cartReducer } from './reducers/cartReducers';
import { 
  productsReducer, 
  newProductReducer, 
  productDetailsReducer, 
  newReviewReducer,
  productReducer, 
  productReviewsReducer,
  reviewReducer } from './reducers/productReducers';

import { 
  authReducer, 
  userReducer, 
  userDetailsReducer, 
  forgotPasswordReducer, 
  allUsersReducer } from './reducers/userReducers';

import { 
  newOrderReducer, 
  myOrdersReducer, 
  orderReducer, 
  orderDetailsReducer, 
  allOrdersReducer } from './reducers/orderReducers';

const reducer = combineReducers({
  auth: authReducer,
  forgotPassword: forgotPasswordReducer,
  newProduct: newProductReducer,
  product: productReducer,
  productDetails: productDetailsReducer,
  allProducts: productsReducer,
  user: userReducer,
  userDetails: userDetailsReducer,
  allUsers: allUsersReducer,
  newOrder: newOrderReducer,
  order: orderReducer,
  orderDetails: orderDetailsReducer,
  allOrders: allOrdersReducer,
  myOrders: myOrdersReducer,
  cart: cartReducer,
  newReview: newReviewReducer,
  review: reviewReducer,
  productReviews: productReviewsReducer
})

const cartItems = localStorage.getItem('cartItems');
const shippingInfo = localStorage.getItem('shippingInfo') ;

let initialState = {
  auth: {
    token: localStorage.getItem('token')
  },
  cart: {
    cartItems: cartItems ? JSON.parse(cartItems) : [],
    shippingInfo: shippingInfo ? JSON.parse(shippingInfo) : {},
    isOpen: false
  }
};
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;