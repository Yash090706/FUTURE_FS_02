// src/reducers/categoryReducers.js
import {
  CATEGORY_PRODUCTS_REQUEST,
  CATEGORY_PRODUCTS_SUCCESS,
  CATEGORY_PRODUCTS_FAIL
} from '../constants/categoryConstants';

export const categoryProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case CATEGORY_PRODUCTS_REQUEST:
      return { loading: true, products: [] };
    case CATEGORY_PRODUCTS_SUCCESS:
      return { loading: false, products: action.payload };
    case CATEGORY_PRODUCTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};