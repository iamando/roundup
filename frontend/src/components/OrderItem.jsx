import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const OrderItem = ({ item }) => {
  return (
    <Fragment>
      <tr key={item.product}>
        <td className="cart_product_img">
          <Link to={`/product/${item.product}`}>
            <img src={item.imageUrl} alt="Product" />
          </Link>
        </td>
        <td className="cart_product_desc">
          <h5>{item.name}</h5>
        </td>
        <td className="price">
          <span>${item.price}</span>
        </td>
        <td className="qty">
          <span>
            <strong>
              {item.qty} x ${item.price} = ${item.qty * item.price}
            </strong>
          </span>
        </td>
      </tr>
    </Fragment>
  );
};

export default OrderItem;
