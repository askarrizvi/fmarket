import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY, UPDATE_CURRENT_STALL } from '../../utils/actions';
import { idbPromise } from "../../utils/helpers";

function ProductItem(stall) {
  const {
    name,
    _id,
    upvotes
  } = stall;
  const [state, dispatch] = useStoreContext();

  const handleClick = id => {
    dispatch({
      type: UPDATE_CURRENT_STALL,
      currentStall: id
    });
  };

  return (
    <div className="card px-1 py-1">
      <Link to={`/stall/${_id}`}>
        <p
        onClick={()=>{
          handleClick(_id)
        }}>{name}</p>
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
