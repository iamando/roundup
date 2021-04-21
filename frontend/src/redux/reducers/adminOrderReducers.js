import * as actionType from "../constants/adminOrderConstants";

export const orderAdminListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case actionType.ADMIN_ORDER_LIST_REQUEST:
      return {
        loading: true,
        orders: [],
      };

    case actionType.ADMIN_ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case actionType.ADMIN_ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const orderAdminDetailsReducer = (
  state = { order: {}, loading: true },
  action
) => {
  switch (action.type) {
    case actionType.ADMIN_ORDER_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case actionType.ADMIN_ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case actionType.ADMIN_ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
