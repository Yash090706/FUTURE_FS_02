// src/actions/categoryActions.js
import axios from 'axios';
import {
  CATEGORY_PRODUCTS_REQUEST,
  CATEGORY_PRODUCTS_SUCCESS,
  CATEGORY_PRODUCTS_FAIL
} from '../constants/categoryConstants';

export const listCategoryProducts = (categoryName) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_PRODUCTS_REQUEST });

    const { data } = await axios.get(`/api/categories/${categoryName}/products/`);

    dispatch({
      type: CATEGORY_PRODUCTS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};