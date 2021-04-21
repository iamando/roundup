import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

// Actions
import { deleteAdminProduct } from "../redux/actions/adminProductActions";

const AdminProduct = ({ product, openModal }) => {
  const dispatch = useDispatch();

  const handleDelete = (product) => {
    dispatch(deleteAdminProduct(product._id));
  };

  return (
    <Fragment>
      <tr key={product._id}>
        <td className="cart_product_desc">
          <Link to={`/product/${product._id}`}>
            <h5>{product.name}</h5>
          </Link>
        </td>
        <td className="price">
          <span>${product.price}</span>
        </td>
        <td className="cart_product_desc">
          <h5>{product.category}</h5>
        </td>
        <td className="qty d-flex">
          <button
            className="btn btn-info px-4 py-3"
            onClick={() => openModal(product)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger px-4 py-3 ml-2"
            onClick={() => handleDelete(product)}
          >
            Remove
          </button>
        </td>
      </tr>
    </Fragment>
  );
};

export default AdminProduct;
