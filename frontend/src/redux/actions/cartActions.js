import axios from "axios";
import * as actionType from "../constants/cartConstants";

import Cookie from "js-cookie";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/v1/products/${productId}`);

    dispatch({
      type: actionType.CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        imageUrl: data.imageUrl,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });

    const {
      cart: { cartItems },
    } = getState();

    Cookie.set("cartItems", JSON.stringify(cartItems));
  } catch (error) {}
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({
    type: actionType.CART_REMOVE_ITEM,
    payload: productId,
  });

  const {
    cart: { cartItems },
  } = getState();

  Cookie.set("cartItems", JSON.stringify(cartItems));
};

export const saveShipping = (data) => (dispatch, getState) => {
  dispatch({
    type: actionType.CART_SAVE_SHIPPING,
    payload: data,
  });

  const {
    cart: { shippingInfo },
  } = getState();

  Cookie.set("shippingInfo", JSON.stringify(shippingInfo));
};

export const savePayment = (data) => (dispatch, getState) => {
  dispatch({
    type: actionType.CART_SAVE_PAYMENT,
    payload: data,
  });

  const {
    cart: { paymentInfo },
  } = getState();

  Cookie.set("paymentInfo", JSON.stringify(paymentInfo));
};
