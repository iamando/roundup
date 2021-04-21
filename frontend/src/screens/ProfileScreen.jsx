import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { profile, update } from "../redux/actions/userActions";

// Component
import Loader from "../components/Loader";
import TextSuccess from "../components/TextSuccess";
import TextError from "../components/TextError";

// Constants
import { USER_UPDATE_PROFILE_RESET } from "../redux/constants/userConstants";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const userProfile = useSelector((state) => state.userProfile);
  const { loading, error, user } = userProfile;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdate;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch({
        type: USER_UPDATE_PROFILE_RESET,
      });
      dispatch(profile(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo._id, user]);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password not match");
    } else {
      dispatch(update({ userId: user._id, name, email, password }));
    }
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
        <Fragment>
          <div className="cart-table-area section-padding-100">
            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className="col-12 col-lg-8">
                  <div className="checkout_details_area mt-50 clearfix">
                    <div className="cart-title">
                      <h2>Profile</h2>
                    </div>
                    {errorUpdate && (
                      <div className="mb-4 ml-0">
                        <TextError text={errorUpdate} />
                      </div>
                    )}
                    {successUpdate && (
                      <div className="mb-4 ml-0">
                        <TextSuccess text={"Profile Updated Successfully"} />
                      </div>
                    )}
                    <form onSubmit={handleUpdate}>
                      <div className="row">
                        <div className="col-12 mb-3">
                          <input
                            type="text"
                            className="form-control"
                            id="first_name"
                            value={name}
                            placeholder="Name"
                            required
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="col-12 mb-3">
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="col-12 mb-3">
                          <input
                            type="password"
                            className="form-control mb-3"
                            id="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <div className="col-12 mb-3">
                          <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>
                        <div className="col-4 mt-4">
                          <button
                            className="btn roundup-btn w-100"
                            type="submit"
                          >
                            {loadingUpdate ? "Updating..." : "Update"}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProfileScreen;
