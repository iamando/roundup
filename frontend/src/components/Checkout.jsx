import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Checkout = ({ props }) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const getCartSubTotal = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((price, item) => item.price * item.qty + price, 0);
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    props.history.push("/signin?redirect=shipping");
  };

  return (
    <Fragment>
      <div className="cart-summary">
        <h5>Cart Total</h5>
        <ul className="summary-table">
          <li>
            <span>subtotal:</span> <span>{getCartSubTotal()}</span>
          </li>
          <li>
            <span>delivery:</span> <span>free</span>
          </li>
          <li>
            <span>total:</span> <span>${getCartCount().toFixed(2)}</span>
          </li>
        </ul>
        {cartItems.length !== 0 && (
          <div className="cart-btn mt-100">
            <Link
              to="/"
              className="btn roundup-btn w-100"
              onClick={handleCheckout}
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Checkout;
