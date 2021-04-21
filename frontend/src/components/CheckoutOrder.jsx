import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

// Actions
import { createOrder } from "../redux/actions/orderActions";

const CheckoutOrder = ({ props }) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const toPrice = (num) => Number(num.toFixed(2));
  cart.itemsPrice = toPrice(cartItems.reduce((a, c) => a + c.qty * c.price, 0));
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const dispatch = useDispatch();

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    dispatch(createOrder({ ...cart, orderItems: cartItems }));
  };
  return (
    <Fragment>
      <div className="cart-summary">
        <h5>Cart Total</h5>
        <form onSubmit={handlePlaceOrder}>
          <ul className="summary-table">
            <li>
              <span>items:</span> <span>${cart.itemsPrice.toFixed(2)}</span>
            </li>
            <li>
              <span>shipping:</span>{" "}
              <span>${cart.shippingPrice.toFixed(2)}</span>
            </li>
            <li>
              <span>tax:</span> <span>${cart.taxPrice.toFixed(2)}</span>
            </li>
            <li>
              <span>delivery:</span> <span>free</span>
            </li>
            <li>
              <span>total:</span> <span>${cart.totalPrice.toFixed(2)}</span>
            </li>
          </ul>
          {cartItems.length !== 0 && (
            <div className="cart-btn mt-100">
              <button type="submit" className="btn roundup-btn w-100">
                Place Order
              </button>
            </div>
          )}
        </form>
      </div>
    </Fragment>
  );
};

export default CheckoutOrder;
