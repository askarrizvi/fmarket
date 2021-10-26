import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Link, useParams } from 'react-router-dom';
import { useStoreContext } from "../utils/GlobalState";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_STALLS
} from '../utils/actions';
import Cart from '../components/Cart';
import { idbPromise } from "../utils/helpers";
import { QUERY_STALLS } from '../utils/queries';

function StallDetails() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();
  const { loading, data } = useQuery(QUERY_STALLS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_STALLS,
        stalls: data.getAllStalls
      });
    }
  }, [data, dispatch]);

  const stall = state.stalls.find(stall => stall._id === id)

  const { cart } = state;

  const addToCart = (product) => {
    //console.log(product)
    const itemInCart = cart.find((cartItem) => cartItem._id === product._id)

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
        <div>
          <Link to="/">← Back to Products</Link>

          <h2>{stall.name}</h2>
          <Container>
            <Row>
              {stall.products.map(product => (
                <Col xs={12} lg={4} className='text-center'>
                  <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={`/images/${product.details.image}`} alt={product.details.name} />
                    <Card.Body>
                      <Card.Title>{product.details.name}</Card.Title>
                      <Card.Text> {product.details.description} </Card.Text>
                      <Card.Text> Quantity: {product.quantity} </Card.Text>
                      <Card.Text> Price: {product.price} </Card.Text>
                      <Button variant="primary" onClick={() => { addToCart(product) }}>Add to cart</Button>
                      <Button variant="primary" disabled={!state.cart.find(p => p._id === product._id)} onClick={() => { removeFromCart(product) }}>Delete from cart</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </div>

      ) : <span>No Stalls</span>}
      {/* {loading ? <img src={spinner} alt="loading" /> : null} */}
      <Cart />
    </>
  );
}

export default StallDetails;