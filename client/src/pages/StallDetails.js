import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_PRODUCTS } from '../utils/queries';
import spinner from '../assets/spinner.gif';
import { useStoreContext } from "../utils/GlobalState";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from '../utils/actions';
import Cart from '../components/Cart';
import { idbPromise } from "../utils/helpers";

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const stall = state.stalls.find(stall => stall._id === id)

  const { cart } = state;

  const addToCart = (product) => {
    const itemInCart = cart.find((cartItem) => cartItem._id === product._id)
    console.log(itemInCart)

    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: product._id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      // if we're updating quantity, use existing item data and increment purchaseQuantity value by one
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...product, purchaseQuantity: 1 }
      });
      // if product isn't in the cart yet, add it to the current shopping cart in IndexedDB
      idbPromise('cart', 'put', { ...product, purchaseQuantity: 1 });
    }
  }

  const removeFromCart = (product) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: product._id
    });

    // upon removal from cart, delete the item from IndexedDB using the `currentProduct._id` to locate what to remove
    idbPromise('cart', 'delete', { ...product });
  };

  
  
  return (
    <>
      {stall ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{stall.name}</h2>
          {stall.products.map(product => (
            <div>
              <p>
                <strong>Product Name:</strong>{product.details.name}
                <strong>Product Description:</strong>{product.details.description}
                <strong>Quantity: </strong>{product.quantity}
                <strong>Price:</strong>${product.price}{' '}
                <button onClick={() => {addToCart(product)}}>Add to cart</button>
            <button
              disabled={!state.cart.find(p => p._id === product._id)}
              onClick={() => {removeFromCart(product)}}
            > 
              Remove from Cart
            </button>
              </p>

              <img
            src={`/images/${product.details.image}`}
            alt={product.details.name}
          />
            </div>
          ))}
        </div>

      ) : null}
      {/* {loading ? <img src={spinner} alt="loading" /> : null} */}
      <Cart />
    </>
  );
}

export default Detail;
