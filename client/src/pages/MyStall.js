import React from 'react'
import { useQuery } from '@apollo/client';
import {  useParams } from 'react-router-dom';
import Auth from '../utils/auth';

import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';
import StallItem from '../components/StallItem';
import { QUERY_USER } from '../utils/queries';
import { Link } from 'react-router-dom';

const MyStall = () => {
  const { id: userParam } = useParams();
  const me = Auth.getProfile()
  console.log(me)

  const { data: userData } = useQuery(QUERY_USER);
  console.log(userData);
  const currentUserStallId = (userData?.user?.stall._id) || {};
  console.log(currentUserStallId);
  
  
  return (
    <div>
      <h2>Farmer's Market Stalls:</h2>
      <div className="card px-1 py-1 centre">
        {Auth.loggedIn() &&  !currentUserStallId ? ( 
          <>
          <p>Create you own Stall here</p>
        <Link to={`/stall/{${currentUserStallId}}`}>
          <button>+</button>
        </Link>
        </>
        ) : (!Auth.loggedIn()) ? (
        <p>Login/Signup to create or modify your own stall</p>
        ):(
        <p>You own a stall already, click{' '}
            <span> 
              <Link to={`/stall/{${currentUserStallId}`}> 
                here 
              </Link>
            </span>{' '}
                to view to add more products to  your stall.
        </p>
        )}
      
      </div>
      {/* <ProductForm  /> */}
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
