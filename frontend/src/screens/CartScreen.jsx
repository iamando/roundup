import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { addToCart } from "../redux/actions/cartActions";

// Components
import CartItem from "../components/CartItem";
import Checkout from "../components/Checkout";

const CartScreen = (props) => {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return (
    <Fragment>
      <div className="cart-table-area section-padding-100">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-lg-8">
              <div className="cart-title mt-50">
                <h2>Shopping Cart</h2>
              </div>

              <div className="cart-table clearfix">
                <table className="table table-responsive">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Description</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.length === 0 ? (
                      <div className="cart-empty">
                        <h4>Sorry, your cart is empty </h4>
                      </div>
                    ) : (
                      <Fragment>
                        {cartItems.map((item) => (
                          <CartItem key={item.product} item={item} />
                        ))}
                      </Fragment>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <Checkout props={props} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CartScreen;
