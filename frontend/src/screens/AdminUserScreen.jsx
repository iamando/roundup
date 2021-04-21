import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Components
import Loader from "../components/Loader";
import AdminUser from "../components/AdminUser";

// Actions
import { listAdminUsers } from "../redux/actions/adminUserActions";

const AdminUserScreen = () => {
  const userAdminList = useSelector((state) => state.userAdminList);
  const { loading, error, users } = userAdminList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listAdminUsers());
  }, [dispatch]);

  console.log(users);

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
                  <h2>Users</h2>
                </div>
                <div className="cart-table clearfix">
                  <table className="table table-responsive">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.length === 0 ? (
                        <div className="cart-empty">
                          <h4>Sorry, users is empty</h4>
                        </div>
                      ) : (
                        <Fragment>
                          {users.map((user) => (
                            <AdminUser key={user._id} user={user} />
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

export default AdminUserScreen;
