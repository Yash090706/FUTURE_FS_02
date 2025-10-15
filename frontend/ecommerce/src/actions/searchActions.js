import axios from "axios";
import {
  PRODUCT_SEARCH_REQUEST,
  PRODUCT_SEARCH_SUCCESS,
  PRODUCT_SEARCH_FAIL,
} from "../constants/searchConstants";

// ✅ Search products by keyword
export const searchProducts = (keyword = "") => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_SEARCH_REQUEST });

    const { data } = await axios.get(`/api/products/?keyword=${keyword}`);

    dispatch({
      type: PRODUCT_SEARCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_SEARCH_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
