import * as actionType from "../constants/adminProductConstants";

export const productAdminListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case actionType.ADMIN_PRODUCT_LIST_REQUEST:
      return {
        loading: true,
        products: [],
      };

    case actionType.ADMIN_PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        resPerPage: action.payload.resPerPage,
        filteredProductsCount: action.payload.filteredProductsCount,
      };

    case actionType.ADMIN_PRODUCT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const productAdminDetailsReducer = (
  state = { product: {}, loading: true },
  action
) => {
  switch (action.type) {
    case actionType.ADMIN_PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case actionType.ADMIN_PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };

    case actionType.ADMIN_PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const productAdminSaveReducer = (state = { product: [] }, action) => {
  switch (action.type) {
    case actionType.ADMIN_PRODUCT_SAVE_REQUEST:
      return {
        loading: true,
      };

    case actionType.ADMIN_PRODUCT_SAVE_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload,
      };

    case actionType.ADMIN_PRODUCT_SAVE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const productAdminDeleteReducer = (state = { product: [] }, action) => {
  switch (action.type) {
    case actionType.ADMIN_PRODUCT_DELETE_REQUEST:
      return {
        loading: true,
      };

    case actionType.ADMIN_PRODUCT_DELETE_SUCCESS:
      return {
        loading: false,
        product: action.payload,
        success: true,
      };

    case actionType.ADMIN_PRODUCT_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
