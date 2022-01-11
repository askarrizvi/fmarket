import React from "react";
import { Link } from "react-router-dom";

import { useStoreContext } from '../../utils/GlobalState';

import { Card, Col, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

function StallItem(stall) {
  const {
    _id,
    name,
    description,
    image,
    upvotes,
  } = stall;
  const [dispatch] = useStoreContext();

  return (
    <>
      <Card className='mt-5 mx-auto shadow-lg p-3 mb-5 bg-white rounded' style={{ width: '75%' }}>
        <Link to={`/stall/${_id}`} style={{ color: 'black', textDecoration: 'none' }} >
          <Card.Img variant="top" src={`/images/${image}`} alt={name} />

          <p style={{ textDecoration: 'underline' }}>{name}</p>

          <p style={{ fontWeight: 'normal' }}>{description}</p>
        </Link>
        <Row className='mt-3' style={{ borderTop: '0.01px solid lightgrey' }}>
          {/* <Col className='mt-4'><button onClick={ addLike }>👍</button></Col> */}
          <Col className='mt-4'><p style={{ fontWeight: 'bold' }}>{upvotes} Likes</p></Col>
          {/* <Col className='mt-4'><button onClick={ removeLike }>👎</button></Col> */}
        </Row>
      </Card>
    </>
  );
}

export default StallItem;