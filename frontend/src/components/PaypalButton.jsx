import React, { Fragment, useEffect } from "react";
import paypal from "paypal-checkout";
import axios from "axios";

const PaypalButton = () => {
  const getPaypalConfig = async () => {
    const { data } = await axios.get("/api/v1/paypal/config");
    console.log(data);
  };

  const initPayPalButton = () => {
    paypal
      .Buttons({
        style: {
          shape: "rect",
          color: "gold",
          layout: "vertical",
          label: "paypal",
        },

        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [{ amount: { currency_code: "EUR", value: 1 } }],
          });
        },

        onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {
            alert(
              "Transaction completed by " + details.payer.name.given_name + "!"
            );
          });
        },

        onError: function (err) {
          console.log(err);
        },
      })
      .render("#paypal-button-container");
  };
  initPayPalButton();

  useEffect(() => {
    getPaypalConfig();
  }, []);

  return (
    <Fragment>
      <div id="smart-button-container">
        <div style={{ textAlign: "center" }}>
          <div id="paypal-button-container"></div>
        </div>
      </div>
      <script
        src="https://www.paypal.com/sdk/js?client-id=sb&currency=EUR"
        data-sdk-integration-source="button-factory"
        data-namespace="paypal_sdk"
      ></script>
      <script></script>
    </Fragment>
  );
};

export default PaypalButton;
