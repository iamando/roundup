import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Components
import Loader from "../components/Loader";
import OrderListItem from "../components/OrderListItem";

// Actions
import { listOrder } from "../redux/actions/orderActions";

const OrdersScreen = (props) => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  if (!userInfo) {
    props.history.push("/signin");
  }

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  console.log(orders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrder());
  }, [dispatch]);

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
              <div className="col-12 col-lg-12">
                <div className="cart-title mt-50">
                  <h2>My Orders</h2>
                </div>
                <div className="cart-table clearfix">
                  <table className="table table-responsive">
                    <thead>
                      <tr style={{ width: "100%" }}>
                        <th style={{ flex: "0 0 16%" }}>ID</th>
                        <th style={{ flex: "0 0 16%" }}>Date</th>
                        <th style={{ flex: "0 0 16%" }}>Total</th>
                        <th style={{ flex: "0 0 16%" }}>Paid</th>
                        <th style={{ flex: "0 0 16%" }}>Delivered</th>
                        <th style={{ flex: "0 0 16%" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <OrderListItem
                          key={order._id}
                          order={order}
                          props={props}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default OrdersScreen;
