import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const MobileNav = () => {
  return (
    <Fragment>
      <div className="mobile-nav">
        <div className="roundup-navbar-brand">
          <Link to="/">
            <img src="/img/logo.png" alt="" />
          </Link>
        </div>

        <div className="roundup-navbar-toggler">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </Fragment>
  );
};

export default MobileNav;
