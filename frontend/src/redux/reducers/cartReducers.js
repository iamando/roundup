import * as actionType from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case actionType.CART_ADD_ITEM:
      const item = action.payload;
      const product = state.cartItems.find((x) => x.product === item.product);

      if (product) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === product.product ? product : x
          ),
        };
      } else {
        return { cartItems: [...state.cartItems, item] };
      }

    case actionType.CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    case actionType.CART_SAVE_SHIPPING:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    case actionType.CART_SAVE_PAYMENT:
      return {
        ...state,
        paymentInfo: action.payload,
      };

    case actionType.CART_EMPTY:
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};
