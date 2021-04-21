import axios from "axios";
import * as actionType from "../constants/adminUserConstants";

// All Users
export const listAdminUsers = () => async (dispatch, getState) => {
  dispatch({
    type: actionType.ADMIN_USER_LIST_REQUEST,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();

    const { data } = await axios.get("/api/v1/admin/users", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({
      type: actionType.ADMIN_USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.ADMIN_USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// User details
export const detailsAdminUser = (userId) => async (dispatch, getState) => {
  dispatch({
    type: actionType.ADMIN_USER_DETAILS_REQUEST,
    payload: userId,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();

    const { data } = await axios.get(`/api/v1/admin/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({
      type: actionType.ADMIN_USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.ADMIN_USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
