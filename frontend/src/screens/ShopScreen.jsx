import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Route } from "react-router-dom";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

// Components
import ShopItem from "../components/ShopItem";
import ShopPagination from "../components/ShopPagination";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";

// Actions
import { listProducts } from "../redux/actions/productActions";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const ShopScreen = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState([1, 1000]);
  const [rating, setRating] = useState(0);

  const productList = useSelector((state) => state.productList);
  const {
    loading,
    error,
    products,
    productsCount,
    filteredProductsCount,
    resPerPage,
  } = productList;

  const keyword = props.match.params.keyword;

  const dispatch = useDispatch();

  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  useEffect(() => {
    dispatch(listProducts(keyword, currentPage, price, category, rating));
  }, [category, currentPage, dispatch, keyword, price, rating]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let count = productsCount;
  if (keyword) {
    count = filteredProductsCount;
  }

  return (
    <Fragment>
      <div className="shop_sidebar_area">
        <div className="widget catagory mb-50">
          <h6 className="widget-title mb-30">Catagories</h6>

          <div className="catagories-menu">
            <ul>
              {categories.map((category) => (
                <li className="active" key={category}>
                  <Link onClick={(e) => setCategory(category)}>{category}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="widget brands mb-50">
          <h6 className="widget-title mb-30">Brands</h6>

          <div className="widget-desc">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="roundup"
              />
              <label className="form-check-label" htmlFor="roundup">
                Roundup
              </label>
            </div>
          </div>
        </div>

        <div className="widget price mb-50">
          <h6 className="widget-title mb-30">Price</h6>

          <div className="widget-desc">
            <div className="slider-range">
              <Range
                marks={{
                  1: `$1`,
                  1000: `$1000`,
                }}
                min={1}
                max={1000}
                defaultValue={[1, 1000]}
                tipFormatter={(value) => `$${value}`}
                tipProps={{
                  placement: "top",
                  visible: true,
                }}
                value={price}
                onChange={(price) => setPrice(price)}
              />
            </div>
          </div>
        </div>

        <div className="widget price mb-50">
          <h6 className="widget-title mb-30">Ratings</h6>
          <ul className="pl-0">
            {[5, 4, 3, 2, 1].map((star) => (
              <li
                style={{
                  cursor: "pointer",
                  listStyle: "none",
                  fontSize: "30px",
                }}
                key={star}
                onClick={() => setRating(star)}
              >
                <div className="rating-outer">
                  <div
                    className="rating-inner"
                    style={{ width: `${star * 20}%` }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {loading ? (
        <div className="roundup-loader">
          <Loader />
        </div>
      ) : error ? (
        <div className="roundup-error">
          <div className="roundup-error-content">{error}</div>
        </div>
      ) : (
        <Fragment>
          {products === null ? (
            <div className="roundup-error">
              <div className="roundup-error-content">
                Sorry, we can't found this product
              </div>
            </div>
          ) : (
            <Fragment>
              <div className="roundup_product_area section-padding-100">
                <Route
                  render={({ history }) => <SearchBar history={history} />}
                />
                <div className="container-fluid" style={{ marginTop: "200px" }}>
                  <div className="row">
                    <div className="col-12">
                      <div className="product-topbar d-xl-flex align-items-end justify-content-between">
                        <div className="total-products">
                          <p>
                            Showing {resPerPage} 0f {productsCount}
                          </p>
                          <div className="view d-flex">
                            <Link to="#">
                              <i
                                className="fa fa-th-large"
                                aria-hidden="true"
                              ></i>
                            </Link>
                            <Link to="#">
                              <i className="fa fa-bars" aria-hidden="true"></i>
                            </Link>
                          </div>
                        </div>

                        <div className="product-sorting d-flex">
                          <div className="sort-by-date d-flex align-items-center mr-15">
                            <p>Sort by</p>
                            <form action="#" method="get">
                              <select name="select" id="sortBydate">
                                <option value="value">Date</option>
                                <option value="value">Newest</option>
                                <option value="value">Popular</option>
                              </select>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    {products.map((product) => (
                      <ShopItem key={product._id} product={product} />
                    ))}
                  </div>

                  {resPerPage <= count && (
                    <div className="row">
                      <ShopPagination
                        currentPage={currentPage}
                        resPerPage={resPerPage}
                        productsCount={productsCount}
                        setCurrentPageNo={setCurrentPageNo}
                      />
                    </div>
                  )}
                </div>
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ShopScreen;
