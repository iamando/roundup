import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Components
import CheckSteps from "../components/CheckSteps";

// Actions
import { saveShipping } from "../redux/actions/cartActions";

const ShippingScreen = (props) => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { shippingInfo } = cart;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  if (!userInfo) {
    props.history.push("/signin");
  }

  const dispatch = useDispatch();

  const handleCheckout = (e) => {
    e.preventDefault();
    dispatch(
      saveShipping({
        firstName,
        lastName,
        email,
        country,
        address,
        city,
        postalCode,
        phoneNo,
      })
    );
    props.history.push("/payment");
  };

  return (
    <Fragment>
      <div className="cart-table-area section-padding-100">
        <div className="container-fluid">
          <CheckSteps step1 step2 />
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
              <div className="checkout_details_area mt-50 clearfix">
                <div className="cart-title">
                  <h2>Shipping</h2>
                </div>

                <form onSubmit={handleCheckout}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="first_name"
                        value={firstName}
                        placeholder="First Name"
                        required
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="last_name"
                        value={lastName}
                        placeholder="Last Name"
                        required
                        onChange={(e) => setLastName(e.target.value)}
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
                      <select
                        className="nice-select w-100"
                        id="country"
                        onChange={(e) => setCountry(e.target.value)}
                        required
                      >
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                        <option value="India">India</option>
                        <option value="Australia">Australia</option>
                        <option value="Brazil">Brazil</option>
                        <option value="Canada">Canada</option>
                        <option value="Madagascar">Madagascar</option>
                      </select>
                    </div>
                    <div className="col-12 mb-3">
                      <input
                        type="text"
                        className="form-control mb-3"
                        id="address"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="postalCode"
                        placeholder="Postal Code"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <input
                        type="number"
                        className="form-control"
                        id="phone"
                        min="0"
                        placeholder="Phone No"
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                      />
                    </div>
                    <div className="col-4 mt-4">
                      <button className="btn roundup-btn w-100" type="submit">
                        Next
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
  );
};

export default ShippingScreen;
