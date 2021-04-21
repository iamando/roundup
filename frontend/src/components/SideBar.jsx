import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Actions
import { logout } from "../redux/actions/userActions";

const SideBar = ({ props }) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const favorite = useSelector((state) => state.favorite);
  const { favoriteItems } = favorite;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  // const dashboard = window.location.pathname === "/dashboard" ? "active" : "";
  // const product = window.location.pathname === "/productList" ? "active" : "";

  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    window.location.reload();
    return false;
  };

  return (
    <Fragment>
      <header className="header-area clearfix">
        <div className="nav-close">
          <i className="fa fa-close" aria-hidden="true"></i>
        </div>

        <div className="logo">
          <Link to="/">
            <img className="my-logo" src="/img/logo.png" alt="" />
          </Link>
        </div>

        <nav className="roundup-nav">
          {userInfo && userInfo.isAdmin ? (
            <ul>
              <li className="active">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/productList">Products</Link>
              </li>
              <li>
                <Link to="/orderList">Orders</Link>
              </li>
              <li>
                <Link to="/userList">Users</Link>
              </li>
            </ul>
          ) : (
            <ul>
              <li className="active">
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <Link to="/shipping">Shipping</Link>
              </li>
              <li>
                <Link to="/orders">Orders</Link>
              </li>
              {!userInfo && (
                <li>
                  <Link to="/register">Register</Link>
                </li>
              )}
            </ul>
          )}
        </nav>
        <div className="roundup-btn-group mt-30 mb-100">
          {userInfo && (
            <Link to="/profile" className="btn roundup-btn mb-15">
              Profile
            </Link>
          )}
          {userInfo && (
            <Link
              to="/logout"
              className="btn roundup-btn mb-15 logout-roundup"
              onClick={handleLogout}
            >
              Logout
            </Link>
          )}
          {!userInfo && (
            <Link to="/signin" className="btn roundup-btn mb-15">
              Login
            </Link>
          )}
          <Link to="/" className="btn roundup-btn active">
            New this week
          </Link>
        </div>
        {userInfo && userInfo.isAdmin ? (
          <Fragment></Fragment>
        ) : (
          <Fragment>
            <div className="cart-fav-search mb-100">
              <Link to="/cart" className="cart-nav">
                <img src="/img/core-img/cart.png" alt="" /> Cart
                {cartItems.length > 0 && (
                  <span className="cart-bagde-number">{cartItems.length}</span>
                )}
              </Link>
              <Link to="/favorite" className="fav-nav">
                <img src="/img/core-img/favorites.png" alt="" /> Favourite
                {favoriteItems.length > 0 && (
                  <span className="cart-bagde-number">
                    {favoriteItems.length}
                  </span>
                )}
              </Link>
            </div>

            <div className="social-info d-flex justify-content-between">
              <Link to="/">
                <i className="fa fa-pinterest" aria-hidden="true"></i>
              </Link>
              <Link to="/">
                <i className="fa fa-instagram" aria-hidden="true"></i>
              </Link>
              <Link to="/">
                <i className="fa fa-facebook" aria-hidden="true"></i>
              </Link>
              <Link to="/">
                <i className="fa fa-twitter" aria-hidden="true"></i>
              </Link>
            </div>
          </Fragment>
        )}
      </header>
    </Fragment>
  );
};

export default SideBar;
