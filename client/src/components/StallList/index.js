import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import ProductItem from '../ProductItem';
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

  const stalls = data?.stalls || [];

  useEffect(() => {
    if(stalls.length>0) {
      console.log("Users data: ");
      console.log(stalls);
      dispatch({
        type: UPDATE_STALLS,
        stalls: data.getUsers.map((user) => {
          return user.stall
        })
      })
      data.getUsers.forEach((user) => {
        console.log(user.stall)
        idbPromise('stalls', 'put', user.stall)
      });
      
    } else if (!loading) {
      idbPromise('stalls', 'get').then((stalls) => {
        dispatch({
          type: UPDATE_STALLS,
          stalls: stalls
        })
      })
      console.log('NO DATA')
    }  
  }, [data, loading])

  return (
    <div className="my-2">
      <h2>Farmer's Market Stalls:</h2>
      {stalls.length ? (
        <div className="flex-row">
            <ProductItem
              key={stalls._id}
              _id={stalls._id}
              image={stalls.image}
              name={stalls.name}
              price={stalls.price}
              quantity={stalls.quantity}
            />
        </div>
      ) : (
        <h3>There aren't any stalls yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
