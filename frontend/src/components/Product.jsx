import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// Components
import Rating from "../components/Rating";

const Product = (props) => {
  const { product } = props;
  const favorite = useSelector((state) => state.favorite);
  const { favoriteItems } = favorite;

  return (
    <Fragment>
      <div className="single-products-catagory clearfix">
        <Link to={`/product/${product._id}`}>
          <img src={product.imageUrl} alt={product.name} />

          <div className="hover-content">
            <div className="line"></div>
            <p>From ${product.price}</p>
            <Rating ratings={product.ratings} numReviews={product.numReviews} />
            <h4>{product.name}</h4>
          </div>
        </Link>
        {favoriteItems.map(
          (item) =>
            item.product === product._id && (
              <span className="favorite-product-hearted">
                <i className="fa fa-heart"></i>
              </span>
            )
        )}
      </div>
    </Fragment>
  );
};

export default Product;
