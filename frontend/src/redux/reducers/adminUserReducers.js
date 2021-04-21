import * as actionType from "../constants/adminUserConstants";

export const userAdminListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case actionType.ADMIN_USER_LIST_REQUEST:
      return {
        loading: true,
        users: [],
      };

    case actionType.ADMIN_USER_LIST_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };

    case actionType.ADMIN_USER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const userAdminDetailsReducer = (
  state = { user: {}, loading: true },
  action
) => {
  switch (action.type) {
    case actionType.ADMIN_USER_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case actionType.ADMIN_USER_DETAILS_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };

    case actionType.ADMIN_USER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
