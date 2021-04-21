import React, { Fragment, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { useSelector } from "react-redux";

// Compenents
import SearchBar from "./components/SearchBar";
import SideBar from "./components/SideBar";
import MobileNav from "./components/MobileNav";
import Footer from "./components/Footer";
import SubscribeSection from "./components/SubscribeSection";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

// Screens
import ProductsScreen from "./screens/ProductsScreen";
import ProductScreen from "./screens/ProductScreen";
import ShopScreen from "./screens/ShopScreen";
import CartScreen from "./screens/CartScreen";
import FavoriteScreen from "./screens/FavoriteScreen";
import SigninScreen from "./screens/SigninScreen";
import RegisterScreen from "./screens/RegisterScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ShippingScreen from "./screens/ShippingScreen";
import OrderScreen from "./screens/OrderScreen";
import OrdersScreen from "./screens/OrdersScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AdminDashboardScreen from "./screens/AdminDashboardScreen";
import AdminProductcreen from "./screens/AdminProductScreen";
import AdminOrderScreen from "./screens/AdminOrderScreen";
import AdminUserScreen from "./screens/AdminUserScreen";

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  return (
    <BrowserRouter>
      <Fragment>
        <div className="main-content-wrapper d-flex clearfix">
          <MobileNav />
          <SideBar />
          <Route path="/" component={ProductsScreen} exact />
          <Route path="/product/:id" component={ProductScreen} exact />
          <Route path="/shop" component={ShopScreen} exact />
          <Route path="/product/search/:keyword" component={ShopScreen}></Route>
          <Route path="/cart/:id?" component={CartScreen} exact />
          <Route path="/signin" component={SigninScreen} exact />
          <Route path="/register" component={RegisterScreen} exact />
          <ProtectedRoute
            path="/favorite/:id?"
            component={FavoriteScreen}
            exact
          />
          <ProtectedRoute
            path="/favorite/:id?"
            component={FavoriteScreen}
            exact
          />
          <ProtectedRoute path="/shipping" component={ShippingScreen} exact />
          <ProtectedRoute
            path="/payment"
            component={PaymentMethodScreen}
            exact
          />
          <ProtectedRoute
            path="/placeorder"
            component={PlaceOrderScreen}
            exact
          />
          <ProtectedRoute path="/order/:id" component={OrderScreen} exact />
          <ProtectedRoute path="/orders" component={OrdersScreen} exact />
          <ProtectedRoute path="/profile" component={ProfileScreen} exact />
          <ProtectedAdminRoute
            path="/dashboard"
            component={AdminDashboardScreen}
            exact
          />
          <ProtectedAdminRoute
            path="/productList"
            component={AdminProductcreen}
            exact
          />
          <ProtectedAdminRoute
            path="/orderList"
            component={AdminOrderScreen}
            exact
          />
          <ProtectedAdminRoute
            path="/userList"
            component={AdminUserScreen}
            exact
          />
        </div>
        {userInfo && userInfo.isAdmin ? <Fragment /> : <SubscribeSection />}
        <Footer />
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
