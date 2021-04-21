import React, { Fragment } from "react";

const Rating = (props) => {
  const { ratings, numReviews } = props;

  return (
    <Fragment>
      <div className="roundup-rating">
        <span>
          <i
            className={
              ratings >= 1
                ? "fa fa-star"
                : ratings >= 0.5
                ? "fa fa-star-half-o"
                : "fa fa-star-o"
            }
          ></i>
        </span>
        <span>
          <i
            className={
              ratings >= 2
                ? "fa fa-star"
                : ratings >= 1.5
                ? "fa fa-star-half-o"
                : "fa fa-star-o"
            }
          ></i>
        </span>
        <span>
          <i
            className={
              ratings >= 3
                ? "fa fa-star"
                : ratings >= 2.5
                ? "fa fa-star-half-o"
                : "fa fa-star-o"
            }
          ></i>
        </span>
        <span>
          <i
            className={
              ratings >= 4
                ? "fa fa-star"
                : ratings >= 3.5
                ? "fa fa-star-half-o"
                : "fa fa-star-o"
            }
          ></i>
        </span>
        <span>
          <i
            className={
              ratings >= 5
                ? "fa fa-star"
                : ratings >= 4.5
                ? "fa fa-star-half-o"
                : "fa fa-star-o"
            }
          ></i>
        </span>
        <span className="roundup-product-reviews">
          {numReviews + "reviews"}
        </span>
      </div>
    </Fragment>
  );
};

export default Rating;
