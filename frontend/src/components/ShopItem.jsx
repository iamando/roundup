import React, { Fragment } from "react";
import { Link } from "react-router-dom";

// Components
import ShopRating from "../components/ShopRating";

const ShopItem = ({ product }) => {
  return (
    <Fragment>
      <div className="col-12 col-sm-6 col-md-12 col-xl-6" key={product._id}>
        <div className="single-product-wrapper">
          <div className="product-img">
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{ height: "600px", objectFit: "cover" }}
            />
          </div>

          <div className="product-description d-flex align-items-center justify-content-between">
            <div className="product-meta-data">
              <div className="line"></div>
              <p className="product-price">${product.price}</p>
              <Link to={`/product/${product._id}`}>
                <h6>{product.name}</h6>
              </Link>
            </div>

            <div className="ratings-cart text-right">
              <ShopRating ratings={product.ratings} />
              <div className="cart">
                <Link
                  to={`/product/${product._id}`}
                  data-toggle="tooltip"
                  data-placement="left"
                  title="Add to Cart"
                >
                  <img src="/img/core-img/cart.png" alt="" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ShopItem;
