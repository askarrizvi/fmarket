import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from "../../utils/helpers";

function ProductItem(stall) {
  const {
    name,
    _id,
    upvotes
  } = stall;

  return (
    <div className="card px-1 py-1">
      <Link to={`/stall/${_id}`}>
        <p>{name}</p>
      </Link>
      <div>
      <button>👍</button>
      <p>{upvotes}</p>
      <button>👎</button>
      </div>
     
    </div>
  );
}

export default ProductItem;
