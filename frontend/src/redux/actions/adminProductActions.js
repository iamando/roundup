import axios from "axios";
import * as actionType from "../constants/adminProductConstants";

// All products
export const listAdminProducts = (
  keyword = "",
  currentPage = 1,
  price,
  category,
  rating = 0
) => async (dispatch, getState) => {
  dispatch({
    type: actionType.ADMIN_PRODUCT_LIST_REQUEST,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    let link = `/api/v1/admin/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`;

    if (category) {
      link = `/api/v1/admin/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`;
    }

    const { data } = await axios.get(link, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({
      type: actionType.ADMIN_PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.ADMIN_PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Details product
export const detailsAdminProduct = (productId) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: actionType.ADMIN_PRODUCT_DETAILS_REQUEST,
    payload: productId,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();

    const { data } = await axios.get(`/api/v1/admin/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({
      type: actionType.ADMIN_PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.ADMIN_PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Save product
export const saveAdminProduct = (product) => async (dispatch, getState) => {
  dispatch({
    type: actionType.ADMIN_PRODUCT_SAVE_REQUEST,
    payload: product,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();

    if (!product._id) {
      const { data } = await axios.post(
        "/api/v1/admin/products/create",
        product,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({
        type: actionType.ADMIN_PRODUCT_SAVE_SUCCESS,
        payload: data,
      });
    } else {
      const { data } = await axios.put(
        `/api/v1/admin/products/update/${product._id}`,
        product,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({
        type: actionType.ADMIN_PRODUCT_SAVE_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.ADMIN_PRODUCT_SAVE_FAIL,
      payload: error.message,
    });
  }
};

// Delete product
export const deleteAdminProduct = (productId) => async (dispatch, getState) => {
  dispatch({
    type: actionType.ADMIN_PRODUCT_DELETE_REQUEST,
    payload: productId,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();

    const { data } = await axios.delete(
      `/api/v1/admin/products/delete/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    dispatch({
      type: actionType.ADMIN_PRODUCT_DELETE_SUCCESS,
      payload: data,
      success: true,
    });
  } catch (error) {
    dispatch({
      type: actionType.ADMIN_PRODUCT_DELETE_FAIL,
      payload: error.message,
    });
  }
};
