import axios from "axios";
import * as actionType from "../constants/userConstants";

import Cookie from "js-cookie";

export const profile = (userId) => async (dispatch, getState) => {
  dispatch({
    type: actionType.USER_PROFILE_REQUEST,
    payload: userId,
  });

  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.get(`/api/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({
      type: actionType.USER_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.USER_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const update = (user) => async (dispatch, getState) => {
  dispatch({
    type: actionType.USER_UPDATE_PROFILE_REQUEST,
    payload: user,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.put(`/api/v1/users/profile`, user, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({
      type: actionType.USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: actionType.USER_SIGNIN_SUCCESS,
      payload: data,
    });
    Cookie.set("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: actionType.USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signin = (email, password) => async (dispatch) => {
  dispatch({
    type: actionType.USER_SIGNIN_REQUEST,
    payload: {
      email,
      password,
    },
  });

  try {
    const { data } = await axios.post("/api/v1/users/signin", {
      email,
      password,
    });

    dispatch({
      type: actionType.USER_SIGNIN_SUCCESS,
      payload: data,
    });

    Cookie.set("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: actionType.USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register = (name, email, password) => async (dispatch) => {
  dispatch({
    type: actionType.USER_REGISTER_REQUEST,
    payload: {
      name,
      email,
      password,
    },
  });

  try {
    const { data } = await axios.post("/api/v1/users/register", {
      name,
      email,
      password,
    });

    dispatch({
      type: actionType.USER_REGISTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    Cookie.remove("userInfo");
    Cookie.remove("cartItems");
    Cookie.remove("shippingInfo");
    Cookie.remove("paymentInfo");
    Cookie.remove("favoriteItems");
    dispatch({
      type: actionType.USER_LOGOUT,
    });
  } catch (error) {
    console.log(error.message);
  }
};
