import React from "react";
import { Link } from "react-router-dom";
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_CURRENT_STALL } from '../../utils/actions';

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
        <button onClick={() => {return upvotes + 1}}>👍</button>
        <p>{upvotes}</p>
        <button onClick={() => {return upvotes - 1}}>👎</button>
      </div>
     
    </div>
  );
}

export default ProductItem;
