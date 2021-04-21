import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { register } from "../redux/actions/userActions";

const RegisterScreen = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const dispatch = useDispatch();

  let isConfirmError = false;
  let confirmError;
  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      isConfirmError = true;
      confirmError = "Password don't match";
      alert("Password not match");
    } else {
      dispatch(register(name, email, password));
      props.history.push("/signin");
    }
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <Fragment>
      <div className="single-product-area section-padding-100 clearfix">
        <div className="container-fluid">
          <div className="limiter">
            <div className="container-login100">
              <div className="wrap-login100">
                <form
                  className="login100-form validate-form"
                  onSubmit={handleRegister}
                >
                  <span className="login100-form-title p-b-43">Register</span>

                  {isConfirmError && (
                    <div className="roundup-auth-error">{confirmError}</div>
                  )}
                  {error && <div className="roundup-auth-error">{error}</div>}

                  <div
                    className="wrap-input100 validate-input"
                    data-validate="Valid name is required"
                  >
                    <input
                      className="input100"
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="new-name"
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                    <span className="focus-input100"></span>
                    <span className="label-input100">Name</span>
                  </div>

                  <div
                    className="wrap-input100 validate-input"
                    data-validate="Valid email is required: ex@abc.xyz"
                  >
                    <input
                      className="input100"
                      type="text"
                      name="email"
                      id="email"
                      autoComplete="new-email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <span className="focus-input100"></span>
                    <span className="label-input100">Email</span>
                  </div>

                  <div
                    className="wrap-input100 validate-input"
                    data-validate="Password is required"
                  >
                    <input
                      className="input100"
                      type="password"
                      name="password"
                      id="password"
                      autoComplete="new-password"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="focus-input100"></span>
                    <span className="label-input100">Password</span>
                  </div>

                  <div
                    className="wrap-input100 validate-input"
                    data-validate="Confirm Password is required"
                  >
                    <input
                      className="input100"
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      autoComplete="new-confirm-password"
                      required
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <span className="focus-input100"></span>
                    <span className="label-input100">Confirm Password</span>
                  </div>

                  <br />

                  <div className="container-login100-form-btn">
                    <button type="submit" className="login100-form-btn">
                      {loading ? "Please wait..." : "Register"}
                    </button>
                  </div>

                  <div className="text-center p-t-46 p-b-20">
                    <span className="txt2">
                      already have an account on roundup ?{" "}
                      <Link to={`/signin?redirect=${redirect}`}>login</Link>
                    </span>
                  </div>
                </form>

                <div
                  className="login100-more"
                  style={{
                    backgroundImage: `url('/img/product-img/pro-big-2.jpg')`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default RegisterScreen;
