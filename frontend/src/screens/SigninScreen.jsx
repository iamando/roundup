import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { signin } from "../redux/actions/userActions";

const SigninScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
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
                  onSubmit={handleLogin}
                >
                  <span className="login100-form-title p-b-43">Login</span>

                  {error && <div className="roundup-auth-error">{error}</div>}

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

                  <div className="flex-sb-m w-full p-t-3 p-b-32">
                    <div className="contact100-form-checkbox">
                      <input
                        className="input-checkbox100"
                        id="ckb1"
                        type="checkbox"
                        name="remember-me"
                      />
                      <label className="label-checkbox100" htmlFor="ckb1">
                        Remember me
                      </label>
                    </div>

                    <div>
                      <Link to="#" className="txt1">
                        Forgot Password?
                      </Link>
                    </div>
                  </div>

                  <div className="container-login100-form-btn">
                    <button type="submit" className="login100-form-btn">
                      {loading ? "Please wait..." : "Login"}
                    </button>
                  </div>

                  <div className="text-center p-t-46 p-b-20">
                    <span className="txt2">
                      new to roundup ? create a account{" "}
                      <Link to={`/register?redirect=${redirect}`}>here</Link>
                    </span>
                  </div>

                  <div className="text-center p-t-46 p-b-20">
                    <span className="txt2">or sign in using</span>
                  </div>

                  <div className="login100-form-social flex-c-m">
                    <Link
                      to="#"
                      className="login100-form-social-item flex-c-m bg1 m-r-5"
                    >
                      <i className="fa fa-facebook-f" aria-hidden="true"></i>
                    </Link>

                    <Link
                      to="#"
                      className="login100-form-social-item flex-c-m bg2 m-r-5"
                    >
                      <i className="fa fa-twitter" aria-hidden="true"></i>
                    </Link>
                  </div>
                </form>

                <div
                  className="login100-more"
                  style={{
                    backgroundImage: `url('/img/product-img/pro-big-1.jpg')`,
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

export default SigninScreen;
