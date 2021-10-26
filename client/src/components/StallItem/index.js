import React from "react";
import { Link } from "react-router-dom";

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
        <button onClick={() => {return upvotes + 1}}>👍</button>
        <p>{upvotes}</p>
        <button onClick={() => {return upvotes - 1}}>👎</button>
      </div>
     
    </div>
  );
}

export default ProductItem;
