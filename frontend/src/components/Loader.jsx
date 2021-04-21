import React, { Fragment } from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <Fragment>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Fragment>
  );
};

export default Loader;
