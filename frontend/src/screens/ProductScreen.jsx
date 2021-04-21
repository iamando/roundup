import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Components
import Loader from "../components/Loader";
import Rating from "../components/Rating";

// Actions
import { detailsProduct } from "../redux/actions/productActions";

const ProductScreen = (props) => {
  const [qty, setQty] = useState(1);

  const productId = props.match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const dispatch = useDispatch();

  const handleQtyMinus = () => {
    var effect = document.getElementById("qty");
    var qty = effect.value;
    if (!isNaN(qty) && qty > 1) {
      effect.value--;
      setQty(effect.value);
    }
    return false;
  };

  const handleQtyPlus = () => {
    var effect = document.getElementById("qty");
    var qty = effect.value;
    if (!isNaN(qty)) {
      effect.value++;
      setQty(effect.value);
    }
    return false;
  };

  const handleAddToCart = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };

  const handleAddToFavorite = () => {
    props.history.push(`/favorite/${productId}`);
  };

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  return (
    <Fragment>
      {loading ? (
        <div className="roundup-loader">
          <Loader />
        </div>
      ) : error ? (
        <div className="roundup-error">
          <div className="roundup-error-content">{error}</div>
        </div>
      ) : (
        <div className="single-product-area section-padding-100 clearfix">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mt-50">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      {product.name}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-lg-7">
                <div className="single_product_thumb">
                  <div
                    id="product_details_slider"
                    className="carousel slide"
                    data-ride="carousel"
                  >
                    <ol className="carousel-indicators">
                      <li
                        className="active"
                        data-target="#product_details_slider"
                        data-slide-to="0"
                        style={{
                          backgroundImage: `url(${product.imageUrl})`,
                        }}
                      ></li>
                    </ol>
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <Link className="gallery_img" to={product.imageUrl}>
                          <img
                            className="d-block w-100"
                            src={product.imageUrl}
                            alt="First slide"
                          />
                        </Link>
                      </div>
                      <span
                        className="favorite-product"
                        onClick={handleAddToFavorite}
                      >
                        <i className="fa fa-heart"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-5">
                <div className="single_product_desc">
                  <div className="product-meta-data">
                    <div className="line"></div>
                    <p className="product-price">${product.price}</p>
                    <Link to={`/product/${product._id}`}>
                      <h6>{product.name}</h6>
                    </Link>

                    <div className="ratings-review mb-15 d-flex align-items-center justify-content-between">
                      <Rating
                        ratings={product.ratings}
                        numReviews={product.numReviews}
                      />
                      <div className="review">
                        <Link to="#">Write A Review</Link>
                      </div>
                    </div>

                    <p className="avaibility">
                      {product.countInStock > 0 ? (
                        <span>
                          <i className="fa fa-circle"></i> In Stock
                        </span>
                      ) : (
                        <span>
                          <i className="fa fa-circle unavailable"></i>{" "}
                          Unavailable
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="short_overview my-5">
                    <p>{product.description}</p>
                  </div>

                  {product.countInStock > 0 && (
                    <form className="cart clearfix" onSubmit={handleAddToCart}>
                      <div className="cart-btn d-flex mb-50">
                        <p>Qty</p>
                        <div className="quantity">
                          <span className="qty-minus" onClick={handleQtyMinus}>
                            <i
                              className="fa fa-caret-down"
                              aria-hidden="true"
                            ></i>
                          </span>
                          <input
                            type="number"
                            className="qty-text"
                            id="qty"
                            step="1"
                            min="1"
                            max={product.countInStock}
                            name="quantity"
                            value={qty}
                          />
                          <span className="qty-plus" onClick={handleQtyPlus}>
                            <i
                              className="fa fa-caret-up"
                              aria-hidden="true"
                            ></i>
                          </span>
                        </div>
                      </div>
                      <button
                        type="submit"
                        name="addtocart"
                        value="5"
                        className="btn roundup-btn"
                      >
                        Add to cart
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ProductScreen;
