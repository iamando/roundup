import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import CheckSteps from "../components/CheckSteps";

// Actions
import { savePayment } from "../redux/actions/cartActions";

const PaymentMethodScreen = (props) => {
  const cart = useSelector((state) => state.cart);
  const { shippingInfo } = cart;

  if (!shippingInfo) {
    props.history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("");

  const dispatch = useDispatch();

  const handlePayment = (e) => {
    e.preventDefault();
    dispatch(savePayment(paymentMethod));
    props.history.push("/placeorder");
  };

  return (
    <Fragment>
      <div className="cart-table-area section-padding-100">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8 justify-content-center">
              <CheckSteps step1 step2 step3 />
              <div className="row justify-content-center">
                <div className="col-12 col-lg-6">
                  <div className="cart-summary roundup-cart-payment">
                    <form onSubmit={handlePayment}>
                      <div className="payment-method">
                        <div className="custom-control custom-checkbox mr-sm-2">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="cod"
                            value="Cash On Delivery"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          />
                          <label className="custom-control-label" htmlFor="cod">
                            Cash on Delivery
                          </label>
                        </div>

                        <div className="custom-control custom-checkbox mr-sm-2">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="paypal"
                            value="PayPal"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="paypal"
                          >
                            Paypal
                            <img
                              className="ml-15"
                              src="/img/core-img/paypal.png"
                              alt=""
                            />
                          </label>
                        </div>

                        <div className="custom-control custom-checkbox mr-sm-2">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="stripe"
                            value="Stripe"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="stripe"
                          >
                            Stripe
                            <img
                              className="ml-15"
                              src="/img/core-img/stripe.png"
                              alt=""
                            />
                          </label>
                        </div>
                      </div>

                      <div className="cart-btn mt-100">
                        <button type="submit" className="btn roundup-btn w-100">
                          Next
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PaymentMethodScreen;
