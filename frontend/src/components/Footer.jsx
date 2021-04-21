import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Footer = () => {
  const date = new Date().getFullYear();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  return (
    <Fragment>
      <footer className="footer_area clearfix">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-lg-4">
              <div className="single_widget_area">
                <div className="footer-logo mr-50">
                  <Link to="/">
                    <img src="/img/logo.png" alt="" />
                  </Link>
                </div>

                <p className="copywrite mr-50">
                  Copyright &copy;
                  {date} All Rights Reserved
                </p>
              </div>
            </div>

            <div className="col-12 col-lg-8">
              <div className="single_widget_area">
                <div className="footer_menu">
                  <nav className="navbar navbar-expand-lg justify-content-end">
                    <button
                      className="navbar-toggler"
                      type="button"
                      data-toggle="collapse"
                      data-target="#footerNavContent"
                      aria-controls="footerNavContent"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <i className="fa fa-bars"></i>
                    </button>
                    <div
                      className="collapse navbar-collapse"
                      id="footerNavContent"
                    >
                      {userInfo && userInfo.isAdmin ? (
                        <ul className="navbar-nav ml-auto">
                          <li className="nav-item active">
                            <Link className="nav-link" to="/dashboard">
                              Dashboard
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" to="/productList">
                              Products
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" to="/orderList">
                              Orders
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" to="/userList">
                              Users
                            </Link>
                          </li>
                        </ul>
                      ) : (
                        <ul className="navbar-nav ml-auto">
                          <li className="nav-item active">
                            <Link className="nav-link" to="/">
                              Home
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" to="/shop">
                              Shop
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" to="/cart">
                              Cart
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" to="/shipping">
                              Shipping
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" to="/orders">
                              Orders
                            </Link>
                          </li>
                          {!userInfo && (
                            <li className="nav-item">
                              <Link className="nav-link" to="/register">
                                Register
                              </Link>
                            </li>
                          )}
                        </ul>
                      )}
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
