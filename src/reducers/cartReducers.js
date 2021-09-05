import { 
  ADD_TO_CART, 
  REMOVE_ITEM_CART,
  EMPTY_CART, 
  SAVE_SHIPPING_INFO,
  LOAD_USER_CART,
  LOAD_USER_SHIPPING_INFO,
  TOGGLE_CART_OVERLAY } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [], shippingInfo: {}, isOpen: false }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const itemExists = state.cartItems.find( i => i.product === item.product );

      if (itemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map( i => i.product === itemExists.product ? item : i)
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item]
        }
      }

    case LOAD_USER_CART:
      return {
        ...state,
        cartItems: action.payload
      }
    
    case REMOVE_ITEM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter( i => i.product !== action.payload )  
      }

    case EMPTY_CART:
      return {
        ...state,
        cartItems: []
      }

    case LOAD_USER_SHIPPING_INFO: 
    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload
      }

    case TOGGLE_CART_OVERLAY:
      return {
        ...state,
        isOpen: !state.isOpen
      }
    default: 
      return state;
  }
}

