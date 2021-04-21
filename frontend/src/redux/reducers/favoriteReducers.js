import * as actionType from "../constants/favoriteConstants";

export const favoriteReducer = (state = { favoriteItems: [] }, action) => {
  switch (action.type) {
    case actionType.FAVORITE_ADD_ITEM:
      const item = action.payload;
      const product = state.favoriteItems.find(
        (x) => x.product === item.product
      );

      if (product) {
        return {
          ...state,
          favoriteItems: state.favoriteItems.map((x) =>
            x.product === product.product ? product : x
          ),
        };
      } else {
        return { favoriteItems: [...state.favoriteItems, item] };
      }

    case actionType.FAVORITE_REMOVE_ITEM:
      return {
        ...state,
        favoriteItems: state.favoriteItems.filter(
          (x) => x.product !== action.payload
        ),
      };

    default:
      return state;
  }
};
