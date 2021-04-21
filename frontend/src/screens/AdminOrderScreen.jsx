import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Components
import Loader from "../components/Loader";
import AdminOrder from "../components/AdminOrder";

// Actions
import { listAdminOrders } from "../redux/actions/adminOrderActions";

const AdminOrderScreen = () => {
  const orderAdminList = useSelector((state) => state.orderAdminList);
  const { loading, error, orders } = orderAdminList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listAdminOrders());
  }, [dispatch]);

  console.log(orders);

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
            <div className="row justify-content-center">
              <div className="col-12 col-lg-12">
                <div className="cart-title mt-50 d-flex align-items-baseline justify-content-between">
                  <h2>Orders</h2>
                </div>
                <div className="cart-table clearfix">
                  <table className="table table-responsive">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Payment</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.length === 0 ? (
                        <div className="cart-empty">
                          <h4>Sorry, orders is empty</h4>
                        </div>
                      ) : (
                        <Fragment>
                          {orders.map((order) => (
                            <AdminOrder key={order._id} order={order} />
                          ))}
                        </Fragment>
                      )}
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

export default AdminOrderScreen;
