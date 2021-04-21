import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

// Components
import CheckoutOrderDetails from "../components/CheckoutOrderDetails";
import Loader from "../components/Loader";
import OrderItem from "../components/OrderItem";
import TextError from "../components/TextError";
import TextSuccess from "../components/TextSuccess";

// Actions
import { detailsOrder, payOrder } from "../redux/actions/orderActions";

// Constants
import * as actionType from "../redux/constants/orderConstants";

const OrderScreen = (props) => {
  const orderId = props.match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const orderPay = useSelector((state) => state.orderPay);
  const cart = useSelector((state) => state.cart);
  const { paymentInfo } = cart;

  const {
    error: errorPay,
    success: successPay,
    loading: loadingPay,
  } = orderPay;

  const [paypalSdkReady, setPaypalSdkReady] = useState(false);

  const dispatch = useDispatch();

  const addPayPalSdk = async () => {
    const { data } = await axios.get("/api/v1/paypal/config");
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
    script.async = true;
    script.onload = () => {
      setPaypalSdkReady(true);
    };
    script.onerror = () => {
      console.error("Paypal SDK could not be loaded.");
    };
    document.body.appendChild(script);
  };

  const getStripeConfig = async () => {
    const { data: stripeKey } = await axios.get("/api/v1/stripe/config");
    console.log(stripeKey);
  };

  useEffect(() => {
    if (paymentInfo === "PayPal") {
      if (!order || successPay || (order && order._id !== orderId)) {
        dispatch({
          type: actionType.ORDER_PAY_RESET,
        });
        dispatch(detailsOrder(orderId));
      } else {
        if (!order.isPaid) {
          if (!window.paypal) {
            addPayPalSdk();
          } else {
            setPaypalSdkReady(true);
          }
        }
      }
    }
    if (paymentInfo === "Stripe") {
      if (!order) {
        getStripeConfig();
        dispatch(detailsOrder(orderId));
      }
    }
  }, [dispatch, order, orderId, paymentInfo, successPay]);

  const onSuccess = (details, data) => {
    alert("Transaction completed by " + details.payer.name.given_name);
    dispatch(payOrder(order, data));
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: order.totalPrice,
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order
      .capture()
      .then((details) => {
        if (props.onSuccess) {
          return props.onSuccess(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleStripeToken = (token, address) => {
    console.log({ token, address });
  };

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
            <div className="row">
              <div className="col-12 col-lg-8">
                <div className="cart-table clearfix mt-50">
                  <table className="table table-responsive">
                    <tbody>
                      <div className="place-order-content-container">
                        <h4>Order {order._id}</h4>
                        <div className="place-order-content">
                          <div>
                            <strong>Name :</strong>{" "}
                            {order.shippingInfo.firstName}{" "}
                            {order.shippingInfo.lastName}
                          </div>
                          <div>
                            <strong>Email :</strong> {order.shippingInfo.email}
                          </div>
                          <div>
                            <strong>Phone :</strong>{" "}
                            {order.shippingInfo.phoneNo}
                          </div>
                          <div>
                            <strong>Address :</strong>{" "}
                            {order.shippingInfo.address},{" "}
                            {order.shippingInfo.city},{" "}
                            {order.shippingInfo.country},{" "}
                            {order.shippingInfo.postalCode}
                          </div>
                          <div>
                            <strong>Delivered :</strong>
                            {order.isDelivered ? (
                              <TextSuccess
                                text={"Paid at {order.deliveredAt}"}
                              />
                            ) : (
                              <TextError text={"Not Delivered"} />
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="place-order-content-container">
                        <h4>Payment</h4>
                        <div className="place-order-content">
                          <div>
                            <strong>Payment :</strong> {order.paymentInfo}
                          </div>
                          <div>
                            <strong>Paid :</strong>
                            {order.isPaid ? (
                              <TextSuccess text={"Paid at {order.paidAt}"} />
                            ) : (
                              <TextError text={"Not Paid"} />
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="place-order-content-container">
                        <h4>Order</h4>
                        <div className="place-order-content">
                          {order.orderItems.map((item) => (
                            <OrderItem key={item.product} item={item} />
                          ))}
                        </div>
                      </div>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <CheckoutOrderDetails
                  order={order}
                  paypalSdkReady={paypalSdkReady}
                  createOrder={createOrder}
                  onApprove={onApprove}
                  onSuccess={onSuccess}
                  errorPay={errorPay}
                  loadingPay={loadingPay}
                  handleStripeToken={handleStripeToken}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default OrderScreen;
