import axios from "axios";
import * as actionType from "../constants/productConstants";

/**
 * List Products
 */
export const listProducts = (
  keyword = "",
  currentPage = 1,
  price,
  category,
  rating = 0
) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.PRODUCT_LIST_REQUEST,
    });

    let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`;

    if (category) {
      link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`;
    }

    const { data } = await axios.get(link);

    dispatch({
      type: actionType.PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/**
 * Details Product
 */
export const detailsProduct = (productId) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.PRODUCT_DETAILS_REQUEST,
      payload: productId,
    });

    const { data } = await axios.get(`/api/v1/products/${productId}`);

    dispatch({
      type: actionType.PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
