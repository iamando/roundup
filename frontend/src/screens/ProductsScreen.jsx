import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Components
import Product from "../components/Product";
import Loader from "../components/Loader";

// Actions
import { listProducts } from "../redux/actions/productActions";

const ProductsScreen = (props) => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  if (userInfo.isAdmin) {
    props.history.push("/dashboard");
  }

  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState([1, 1000]);
  const [rating, setRating] = useState(0);
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts(keyword, currentPage, price, category, rating));
  }, [category, currentPage, dispatch, keyword, price, rating]);

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
        <div className="products-catagories-area clearfix">
          <div className="roundup-pro-catagory clearfix">
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ProductsScreen;
