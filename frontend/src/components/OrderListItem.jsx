import React, { Fragment } from "react";

const OrderListItem = ({ order, props }) => {
  const handleDetails = () => {
    props.history.push(`/order/${order._id}`);
  };

  return (
    <Fragment>
      <tr key={order._id} style={{ width: "66%" }}>
        <td className="roundup-orders-id" style={{ flex: "0 0 24%" }}>
          <span>{order._id}</span>
        </td>
        <td className="cart_product_desc" style={{ flex: "0 0 24%" }}>
          <span>{order.createdAt.substr(0, 10)}</span>
        </td>
        <td className="cart_product_desc" style={{ flex: "0 0 24%" }}>
          <span>${order.totalPrice.toFixed(2)}</span>
        </td>
        <td className="cart_product_desc" style={{ flex: "0 0 24%" }}>
          <span>{order.isPaid ? order.paidAt.substr(0, 10) : "No"}</span>
        </td>
        <td className="cart_product_desc" style={{ flex: "0 0 24%" }}>
          <span>
            {order.isDelivered ? order.deliveredAt.substr(0, 10) : "No"}
          </span>
        </td>
        <td className="cart_product_desc" style={{ flex: "0 0 24%" }}>
          <span>
            <button
              type="button"
              className="small cart-item-remove"
              onClick={handleDetails}
            >
              Details
            </button>
          </span>
        </td>
      </tr>
    </Fragment>
  );
};

export default OrderListItem;
