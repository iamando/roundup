import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

// Actions
import { removeFromCart } from "../redux/actions/cartActions";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemoveCart = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <Fragment>
      <tr key={item.product}>
        <td className="cart_product_img">
          <Link to={`/product/${item.product}`}>
            <img src={item.imageUrl} alt="Product" />
          </Link>
        </td>
        <td className="cart_product_desc">
          <h5>
            You add {item.qty} {item.name} to your cart
          </h5>
        </td>
        <td className="price">
          <span>${item.price}</span>
        </td>
        <td className="qty">
          <button
            className="cart-item-remove"
            onClick={() => handleRemoveCart(item.product)}
          >
            Remove
          </button>
        </td>
      </tr>
    </Fragment>
  );
};

export default CartItem;
