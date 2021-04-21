import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const AdminOrder = ({ order }) => {
  const dispatch = useDispatch();

  return (
    <Fragment>
      <tr key={order._id}>
        <td className="cart_product_desc">
          <Link to={`/order/${order._id}`}>
            <h5>{order._id}</h5>
          </Link>
        </td>
        <td className="price">
          <span>{order.createdAt.substr(0, 10)}</span>
        </td>
        <td className="cart_product_desc">
          <h5>{order.paymentInfo}</h5>
        </td>
        <td className="qty d-flex">
          <button className="btn btn-info px-4 py-3">Details</button>
        </td>
      </tr>
    </Fragment>
  );
};

export default AdminOrder;
