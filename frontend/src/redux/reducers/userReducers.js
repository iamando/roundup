import * as actionType from "../constants/userConstants";

export const userProfileReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case actionType.USER_PROFILE_REQUEST:
      return {
        loading: true,
      };

    case actionType.USER_PROFILE_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };

    case actionType.USER_PROFILE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case actionType.USER_UPDATE_PROFILE_REQUEST:
      return {
        loading: true,
      };

    case actionType.USER_UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case actionType.USER_UPDATE_PROFILE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case actionType.USER_UPDATE_PROFILE_RESET:
      return {};

    default:
      return state;
  }
};

export const userSignInReducer = (state = {}, action) => {
  switch (action.type) {
    case actionType.USER_SIGNIN_REQUEST:
      return {
        loading: true,
      };

    case actionType.USER_SIGNIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };

    case actionType.USER_SIGNIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case actionType.USER_REGISTER_REQUEST:
      return {
        loading: true,
      };

    case actionType.USER_REGISTER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };

    case actionType.USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// export const userLogoutReducer = (state = {}, action) => {
//   switch (action.type) {
//     case actionType.USER_LOGOUT_REQUEST:
//       return {
//         loading: true,
//       };

//     case actionType.USER_LOGOUT_SUCCESS:
//       return {
//         loading: false,
//         userInfo: null,
//       };

//     case actionType.USER_LOGOUT_FAIL:
//       return {
//         ...state,
//         error: action.payload,
//       };

//     default:
//       return state;
//   }
// };
