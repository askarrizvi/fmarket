import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import StallItem from '../StallItem';
import { QUERY_USERS } from '../../utils/queries';
import spinner from '../../assets/spinner.gif';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_STALLS } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
// import { UPDATE_PRODUCTS } from '../../utils/actions';
// import { idbPromise } from "../../utils/helpers";

function ProductList() {
  const [state, dispatch] = useStoreContext();

  const { loading, data } = useQuery(QUERY_USERS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_STALLS,
        stalls: data.getUsers.map((user) => {
          return user.stall
        })
      })
      data.getUsers.forEach((user) => {
        idbPromise('stalls', 'put', user.stall)
      });

    } else if (!loading) {
      idbPromise('stalls', 'get').then((stalls) => {
        dispatch({
          type: UPDATE_STALLS,
          stalls: stalls
        })
      })
    }
  }, [data, loading])

  return (
    <div className="my-2">
      <h2>Farmer's Market Stalls:</h2>
      {state.stalls.length ? (
        <div className="flex-row">
          {state.stalls.map(stall => (
            <StallItem
              key={stall._id}
              _id={stall._id}
              name={stall.name}
              products={stall.products}
              upvotes={stall.upvotes}
            />
          ))}
        </div>
      ) : (
        <h3>There aren't any stalls yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
