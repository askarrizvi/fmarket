import React from 'react'
import { useQuery } from '@apollo/client';
import {  useParams } from 'react-router-dom';
import Auth from '../utils/auth';

import ProductForm from '../components/ProductForm';
import StallItem from '../components/StallItem';
import { QUERY_USER_BY_ID } from '../utils/queries';

const MyStall = () => {
  const { id: userParam } = useParams();
  const me = Auth.getProfile()
  console.log(me)
  // console.log(me.data._id)
  // const { data } = useQuery(QUERY_USER_BY_ID, {
  //   variables: {id:me.data._id}
  // });
   
  // const user = data?.user;
  // console.log(user)
  return (
    <div>
      <ProductForm  />
    {/* <div className="my-2">hi
      {data.length ? (
        <div className="flex-row">
          <h2>Your Stall:</h2>
          {user.products.map(product => (
            <StallItem
              key={product._id}
              _id={product._id}
              products={user.products}
            />
          ))}
        </div>
        ): (
        <p>you have no products in the stall</p>
      )}
    </div> */}
    </div>
  );
};

export default MyStall;
