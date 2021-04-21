import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

// Actions
import { removeFromFavorite } from "../redux/actions/favoriteActions";

const FavoriteItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemoveFavorite = (id) => {
    dispatch(removeFromFavorite(id));
  };

  return (
    <Fragment>
      <tr key={item.product}>
        <td className="cart_product_img">
          <Link to={`/product/${item.product}`}>
            <img src={item.imageUrl} alt="Product" />
          </Link>
        </td>
        <td className="cart_product_desc">
          <h5>{item.name}</h5>
        </td>
        <td className="price">
          <span>${item.price}</span>
        </td>
        <td className="qty">
          <button
            className="cart-item-remove"
            onClick={() => handleRemoveFavorite(item.product)}
          >
            Remove
          </button>
        </td>
      </tr>
    </Fragment>
  );
};

export default FavoriteItem;
