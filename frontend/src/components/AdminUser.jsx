import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const AdminUser = ({ user }) => {
  const dispatch = useDispatch();

  return (
    <Fragment>
      <tr key={user._id}>
        <td className="cart_product_desc">
          <Link to={`/user/${user._id}`}>
            <h5>{user._id}</h5>
          </Link>
        </td>
        <td className="price">
          <span>{user.name}</span>
        </td>
        <td className="cart_product_desc">
          <h5>{user.email}</h5>
        </td>
        <td className="qty d-flex">
          <button className="btn btn-info px-4 py-3">Details</button>
        </td>
      </tr>
    </Fragment>
  );
};

export default AdminUser;
