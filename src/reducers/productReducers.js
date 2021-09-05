import { 
  ALL_PRODUCTS_REQUEST, 
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL, 
  ADMIN_PRODUCTS_REQUEST, 
  ADMIN_PRODUCTS_SUCCESS,
  ADMIN_PRODUCTS_FAIL, 
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_RESET,
  NEW_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_RESET,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_RESET,
  UPDATE_PRODUCT_FAIL,
  ARCHIVE_PRODUCT_REQUEST,
  ARCHIVE_PRODUCT_SUCCESS,
  ARCHIVE_PRODUCT_RESET,
  ARCHIVE_PRODUCT_FAIL,
  UNARCHIVE_PRODUCT_REQUEST,
  UNARCHIVE_PRODUCT_SUCCESS,
  UNARCHIVE_PRODUCT_RESET,
  UNARCHIVE_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_RESET,
  NEW_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_RESET,
  DELETE_REVIEW_FAIL,
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAIL,
  ADMIN_VARIANTS_REQUEST,
  ADMIN_VARIANTS_SUCCESS,
  ADMIN_VARIANTS_FAIL,
  GET_VARIANTS_REQUEST,
  GET_VARIANTS_SUCCESS,
  GET_VARIANTS_FAIL,
  NEW_VARIANT_REQUEST,
  NEW_VARIANT_SUCCESS,
  NEW_VARIANT_RESET,
  NEW_VARIANT_FAIL,
  VARIANT_DETAILS_REQUEST,
  VARIANT_DETAILS_SUCCESS,
  VARIANT_DETAILS_FAIL,
  UPDATE_VARIANT_REQUEST,
  UPDATE_VARIANT_SUCCESS,
  UPDATE_VARIANT_RESET,
  UPDATE_VARIANT_FAIL,
  DELETE_VARIANT_REQUEST,
  DELETE_VARIANT_SUCCESS,
  DELETE_VARIANT_RESET,
  DELETE_VARIANT_FAIL,
  CLEAR_ERRORS
} from '../constants/productConstants';

export const productsReducer = (state = { products:[] }, action) => {
  switch(action.type) {
    case ALL_PRODUCTS_REQUEST:
    case ADMIN_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: []
      }

    case ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        resPerPage: action.payload.resPerPage,
        filteredCount: action.payload.filteredCount
      }

    case ADMIN_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload
      }

    case ALL_PRODUCTS_FAIL:
    case ADMIN_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }

    default:
        return state;
  }
};

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true
      }

    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload
      }

    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload
      }
      
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }

    default: 
      return state;
  }
};

export const newReviewReducer = (state = { }, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true
      }

    case NEW_REVIEW_SUCCESS:
      return {
        loading: false, 
        success: action.payload
      }

    case NEW_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload
      }
      
    case NEW_REVIEW_RESET:
      return {
        ...state,
        success: false
      }
      
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }

    default: 
      return state;
  }
};

export const newProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case NEW_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true
      }

    case NEW_PRODUCT_SUCCESS:
      return {
        loading: false, 
        success: action.payload.success,
        product: action.payload.product
      }

    case NEW_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload
      }
      
    case NEW_PRODUCT_RESET:
      return {
        ...state,
        success: false
      }
      
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }

    default: 
      return state;
  }
};

export const productReducer = (state = { }, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
    case ARCHIVE_PRODUCT_REQUEST:
    case UNARCHIVE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true
      }

    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false, 
        isDeleted: action.payload
      }
    
    case ARCHIVE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isArchived: action.payload
      }

    case UNARCHIVE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUnarchived: action.payload
      }
  
    
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false, 
        isUpdated: action.payload
      }

    case DELETE_PRODUCT_FAIL:
    case UPDATE_PRODUCT_FAIL:
    case ARCHIVE_PRODUCT_FAIL:
    case UNARCHIVE_PRODUCT_FAIL:

      return {
        ...state,
        loading: false,
        error: action.payload
      }
      
    case DELETE_PRODUCT_RESET:
      return {
        ...state,
        isDeleted: false
      }

    case ARCHIVE_PRODUCT_RESET:
      return {
        ...state,
        isArchived: false
      }

    case UNARCHIVE_PRODUCT_RESET:
      return {
        ...state,
        isUnarchived: false
      }

    case UPDATE_PRODUCT_RESET:
      return {
        ...state,
        isUpdated: false
      }
      
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }

    default: 
      return state;
  }
};


export const productReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case GET_REVIEWS_REQUEST:
      return {
        ...state,
        loading: true
      }

    case GET_REVIEWS_SUCCESS:
      return {
        loading: false, 
        reviews: action.payload
      }

    case GET_REVIEWS_FAIL:
      return {
        loading: false,
        error: action.payload
      }
      
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }

    default: 
      return state;
  }
};

export const reviewReducer = (state = { }, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true
      }

    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false, 
        isDeleted: action.payload
      }

    case DELETE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
      
    case DELETE_REVIEW_RESET:
      return {
        ...state,
        isDeleted: false
      }
      
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }

    default: 
      return state;
  }
};

export const productVariantsReducer = (state = { variants: [] }, action) => {
  switch (action.type) {
    case GET_VARIANTS_REQUEST:
      return {
        ...state,
        loading: true
      }

    case GET_VARIANTS_SUCCESS:
      return {
        loading: false, 
        variants: action.payload
      }

    case GET_VARIANTS_FAIL:
      return {
        loading: false,
        error: action.payload
      }
      
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }

    default: 
      return state;
  }
};

export const variantReducer = (state = { }, action) => {
  switch (action.type) {
    case DELETE_VARIANT_REQUEST:
      return {
        ...state,
        loading: true
      }

    case DELETE_VARIANT_SUCCESS:
      return {
        ...state,
        loading: false, 
        isDeleted: action.payload
      }

    case DELETE_VARIANT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
      
    case DELETE_VARIANT_RESET:
      return {
        ...state,
        isDeleted: false
      }
      
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }

    default: 
      return state;
  }
};