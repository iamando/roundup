import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { addToFavorite } from "../redux/actions/favoriteActions";

// Components
import FavoriteItem from "../components/FavoriteItem";

const FavoriteScreen = (props) => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  if (!userInfo) {
    props.history.push("/signin");
  }

  const productId = props.match.params.id;
  const favorite = useSelector((state) => state.favorite);
  const { favoriteItems } = favorite;

  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToFavorite(productId));
    }
  }, [dispatch, productId]);

  return (
    <Fragment>
      <div className="cart-table-area section-padding-100">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-lg-8">
              <div className="cart-title mt-50">
                <h2>Favorite</h2>
              </div>

              <div className="cart-table clearfix">
                <table className="table table-responsive">
                  <thead>
                    <tr>
                      <th></th>
                      <th>name</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {favoriteItems.length === 0 ? (
                      <div className="cart-empty">
                        <h4>Sorry, you don't have a favorite</h4>
                      </div>
                    ) : (
                      <Fragment>
                        {favoriteItems.map((item) => (
                          <FavoriteItem key={item.product} item={item} />
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
    </Fragment>
  );
};

export default FavoriteScreen;
