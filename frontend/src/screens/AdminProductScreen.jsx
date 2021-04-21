import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Components
import Loader from "../components/Loader";
import AdminProduct from "../components/AdminProduct";
import ShopPagination from "../components/ShopPagination";

// Actions
import {
  listAdminProducts,
  saveAdminProduct,
} from "../redux/actions/adminProductActions";

const AdminProductScreen = () => {
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryValue, setCategoryValue] = useState("");
  const [priceValue, setPriceValue] = useState([1, 10000]);
  const [rating, setRating] = useState(0);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [category, setCategory] = useState("");
  const [seller, setSeller] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const productAdminList = useSelector((state) => state.productAdminList);
  const {
    loading,
    error,
    products,
    productsCount,
    filteredProductsCount,
    resPerPage,
  } = productAdminList;

  const productAdminSave = useSelector((state) => state.productAdminSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productAdminSave;

  const productAdminDelete = useSelector((state) => state.productAdminDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productAdminDelete;

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }

    dispatch(
      listAdminProducts(keyword, currentPage, priceValue, categoryValue, rating)
    );
  }, [
    categoryValue,
    currentPage,
    dispatch,
    keyword,
    priceValue,
    rating,
    successSave,
    successDelete,
  ]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let count = productsCount;
  if (keyword) {
    count = filteredProductsCount;
  }

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setImageUrl(product.imageUrl);
    setDescription(product.description);
    setBrand(product.brand);
    setPrice(product.price);
    setCountInStock(product.countInStock);
    setCategory(product.category);
    setSeller(product.seller);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      saveAdminProduct({
        _id: id,
        name,
        imageUrl,
        description,
        brand,
        price,
        countInStock,
        category,
        seller,
      })
    );
  };

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
        <div className="cart-table-area section-padding-100">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-12">
                <div className="cart-title mt-50 d-flex align-items-baseline justify-content-between">
                  <h2>Products</h2>
                  <button
                    className="btn btn-primary py-3"
                    onClick={() => openModal({})}
                  >
                    Create a Product
                  </button>
                </div>

                {modalVisible && (
                  <div>
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-12 mb-3">
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={name}
                            placeholder="Name"
                            required
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="col-12 mb-3">
                          <input
                            type="text"
                            className="form-control"
                            id="description"
                            value={description}
                            placeholder="Description"
                            required
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </div>
                        <div className="col-12 mb-3">
                          <input
                            type="text"
                            className="form-control"
                            id="imageUrl"
                            placeholder="Image"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                          />
                        </div>
                        <div className="col-12 mb-3">
                          <select
                            className="nice-select w-100"
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                          >
                            {categories.map((category) => (
                              <option value={category} key={category}>
                                {category}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-12 mb-3">
                          <input
                            type="number"
                            className="form-control"
                            id="price"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                          />
                        </div>
                        <div className="col-12 mb-3">
                          <input
                            type="number"
                            className="form-control"
                            id="countInStock"
                            placeholder="Count In Stock"
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                          />
                        </div>
                        <div className="col-12 mb-3">
                          <input
                            type="text"
                            className="form-control"
                            id="brand"
                            placeholder="Brand"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                          />
                        </div>
                        <div className="col-12 mb-3">
                          <input
                            type="text"
                            className="form-control"
                            id="seller"
                            placeholder="Seller"
                            value={seller}
                            onChange={(e) => setSeller(e.target.value)}
                          />
                        </div>
                        <div className="col-12 mt-4">
                          <button
                            className="btn roundup-btn w-100"
                            type="submit"
                          >
                            {id ? "Update" : "Create"}
                          </button>
                        </div>
                        <div className="col-12 mt-4">
                          <button
                            className="btn roundup-btn active w-100"
                            type="button"
                            onClick={() => setModalVisible(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}

                {!modalVisible && (
                  <Fragment>
                    <div className="cart-table clearfix">
                      <table className="table table-responsive">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.length === 0 ? (
                            <div className="cart-empty">
                              <h4>Sorry, products is empty</h4>
                            </div>
                          ) : (
                            <Fragment>
                              {products.map((product) => (
                                <AdminProduct
                                  key={product._id}
                                  product={product}
                                  openModal={openModal}
                                />
                              ))}
                            </Fragment>
                          )}
                        </tbody>
                      </table>
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
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default AdminProductScreen;
