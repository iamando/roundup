import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Constants
import * as actionType from "../redux/constants/orderConstants";

// Components
import CheckSteps from "../components/CheckSteps";
import CheckoutOrder from "../components/CheckoutOrder";
import OrderItem from "../components/OrderItem";
import Loader from "../components/Loader";

const PlaceOrderScreen = (props) => {
  const cart = useSelector((state) => state.cart);
  const { shippingInfo, paymentInfo, cartItems } = cart;

  if (!paymentInfo) {
    props.history.push("/payment");
  }

  const dispatch = useDispatch();

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({
        type: actionType.ORDER_CREATE_RESET,
      });
    }
  }, [dispatch, order, props.history, success]);

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
            <CheckSteps step1 step2 step3 step4 />
            <div className="row">
              <div className="col-12 col-lg-8">
                <div className="cart-table clearfix mt-50">
                  <table className="table table-responsive">
                    <tbody>
                      <div className="place-order-content-container">
                        <h4>Shipping</h4>
                        <div className="place-order-content">
                          <div>
                            <strong>Name :</strong> {shippingInfo.firstName}{" "}
                            {shippingInfo.lastName}
                          </div>
                          <div>
                            <strong>Email :</strong> {shippingInfo.email}
                          </div>
                          <div>
                            <strong>Phone :</strong> {shippingInfo.phoneNo}
                          </div>
                          <div>
                            <strong>Address :</strong> {shippingInfo.address},{" "}
                            {shippingInfo.city}, {shippingInfo.country},{" "}
                            {shippingInfo.postalCode}
                          </div>
                        </div>
                      </div>

                      <div className="place-order-content-container">
                        <h4>Payment</h4>
                        <div className="place-order-content">
                          <div>
                            <strong>Payment :</strong> {paymentInfo}
                          </div>
                        </div>
                      </div>

                      <div className="place-order-content-container">
                        <h4>Order</h4>
                        <div className="place-order-content">
                          {cartItems.length === 0 ? (
                            <div className="cart-empty">
                              <h4>Sorry, your order is empty </h4>
                            </div>
                          ) : (
                            <Fragment>
                              {cartItems.map((item) => (
                                <OrderItem key={item.product} item={item} />
                              ))}
                            </Fragment>
                          )}
                        </div>
                      </div>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <CheckoutOrder props={props} />
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default PlaceOrderScreen;
