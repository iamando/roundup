import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import Cookie from "js-cookie";

// Reducers
import { cartReducer } from "./redux/reducers/cartReducers";
import {
  productDetailsReducer,
  productListReducer,
} from "./redux/reducers/productReducers";
import { favoriteReducer } from "./redux/reducers/favoriteReducers";
import {
  userProfileReducer,
  userSignInReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./redux/reducers/userReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListReducer,
} from "./redux/reducers/orderReducers";
import {
  productAdminDeleteReducer,
  productAdminDetailsReducer,
  productAdminListReducer,
  productAdminSaveReducer,
} from "./redux/reducers/adminProductReducers";
import {
  orderAdminListReducer,
  orderAdminDetailsReducer,
} from "./redux/reducers/adminOrderReducers";
import {
  userAdminListReducer,
  userAdminDetailsReducer,
} from "./redux/reducers/adminUserReducers";

// Data from cookie
const cartItems = Cookie.getJSON("cartItems") || [];
const favoriteItems = Cookie.getJSON("favoriteItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;
const shippingInfo = Cookie.getJSON("shippingInfo") || {};
const paymentInfo = Cookie.getJSON("paymentInfo") || null;

const initialState = {
  cart: { cartItems, shippingInfo, paymentInfo },
  favorite: { favoriteItems },
  userSignin: { userInfo },
};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  favorite: favoriteReducer,
  userProfile: userProfileReducer,
  userUpdate: userUpdateReducer,
  userSignin: userSignInReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderList: orderListReducer,
  productAdminList: productAdminListReducer,
  productAdminDetails: productAdminDetailsReducer,
  productAdminSave: productAdminSaveReducer,
  productAdminDelete: productAdminDeleteReducer,
  orderAdminList: orderAdminListReducer,
  orderAdminDetails: orderAdminDetailsReducer,
  userAdminList: userAdminListReducer,
  userAdminDetails: userAdminDetailsReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
