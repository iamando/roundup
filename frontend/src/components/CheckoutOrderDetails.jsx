import React, { Fragment } from "react";

// Components
import Loader from "../components/Loader";
import { PayPalButton } from "react-paypal-button-v2";
import StripeCheckout from "react-stripe-checkout";
import TextError from "../components/TextError";

const CheckoutOrderDetails = ({
  order,
  paypalSdkReady,
  createOrder,
  onApprove,
  onSuccess,
  errorPay,
  loadingPay,
  handleStripeToken,
}) => {
  return (
    <Fragment>
      <div className="cart-summary">
        <h5>Order Summary</h5>
        <form>
          <ul className="summary-table">
            <li>
              <span>items:</span> <span>${order.itemsPrice.toFixed(2)}</span>
            </li>
            <li>
              <span>shipping:</span>{" "}
              <span>${order.shippingPrice.toFixed(2)}</span>
            </li>
            <li>
              <span>tax:</span> <span>${order.taxPrice.toFixed(2)}</span>
            </li>
            <li>
              <span>delivery:</span> <span>free</span>
            </li>
            <li>
              <span>total:</span> <span>${order.totalPrice.toFixed(2)}</span>
            </li>
          </ul>
          {!order.isPaid && (
            <Fragment>
              <Fragment>
                {order.paymentInfo === "PayPal" && (
                  <Fragment>
                    {!paypalSdkReady ? (
                      <div className="roundup-loader">
                        <Loader />
                        <div className="roundup-pls-wait">
                          Loading Paypal...
                        </div>
                      </div>
                    ) : (
                      <Fragment>
                        {errorPay && <TextError>{errorPay}</TextError>}
                        {loadingPay && <Loader />}
                        <PayPalButton
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onSuccess={onSuccess}
                        />
                      </Fragment>
                    )}
                  </Fragment>
                )}
              </Fragment>
              <Fragment>
                {order.paymentInfo === "Stripe" && (
                  <Fragment>
                    <StripeCheckout
                      stripeKey="pk_test_51IHZhkBDiun5tsKj5irGTTO1ISXH1TEsNYXOI5QywKRiqwFdgXWDiesvKn1n6Iu9sB39A5mspcupKjJ2HNFH5vs900eTJyySq9"
                      token={handleStripeToken}
                    />
                  </Fragment>
                )}
              </Fragment>
            </Fragment>
          )}
        </form>
      </div>
    </Fragment>
  );
};

export default CheckoutOrderDetails;
