import axios from "axios";
import * as actionType from "../constants/adminOrderConstants";

// All orders
export const listAdminOrders = () => async (dispatch, getState) => {
  dispatch({
    type: actionType.ADMIN_ORDER_LIST_REQUEST,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();

    const { data } = await axios.get("/api/v1/admin/orders", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({
      type: actionType.ADMIN_ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.ADMIN_ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Order details
export const detailsAdminOrder = (orderId) => async (dispatch, getState) => {
  dispatch({
    type: actionType.ADMIN_ORDER_DETAILS_REQUEST,
    payload: orderId,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();

    const { data } = await axios.get(`/api/v1/admin/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({
      type: actionType.ADMIN_ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.ADMIN_ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
