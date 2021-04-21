import axios from "axios";
import * as actionType from "../constants/favoriteConstants";

import Cookie from "js-cookie";

export const addToFavorite = (productId) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/v1/products/${productId}`);

    dispatch({
      type: actionType.FAVORITE_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        imageUrl: data.imageUrl,
        price: data.price,
        countInStock: data.countInStock,
      },
    });

    const {
      favorite: { favoriteItems },
    } = getState();

    Cookie.set("favoriteItems", JSON.stringify(favoriteItems));
  } catch (error) {}
};

export const removeFromFavorite = (productId) => (dispatch, getState) => {
  dispatch({
    type: actionType.FAVORITE_REMOVE_ITEM,
    payload: productId,
  });

  const {
    favorite: { favoriteItems },
  } = getState();

  Cookie.set("favoriteItems", JSON.stringify(favoriteItems));
};
