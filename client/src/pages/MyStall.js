import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

import { Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import StallItem from '../components/StallItem';
import { QUERY_USER } from '../utils/queries';
import spinner from '../assets/spinner.gif';
import { useStoreContext } from '../utils/GlobalState';



const MyStall = () => {

    const { loading, data } = useQuery(QUERY_USER);
    let user;

    if (data) {
        user = data.user;
    }


    return (
        <div className="my-2">
            {user ? (
                <>
                    <h2>My Stall:</h2>
                    {user.stall ? (
                        <div className="flex-row">
                            <Container>
                                <Row>
                                    <Col xs={12}>
                                        <StallItem
                                            key={user.stall._id}
                                            _id={user.stall._id}
                                            name={user.stall.name}
                                            description={user.stall.description}
                                            image={user.stall.image}
                                            products={user.stall.products}
                                            upvotes={user.stall.upvotes}
                                        />
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    ) : <Link to="/addstall">Click here to create a new stall</Link>}
                </>
            ) : <span>Please Login</span>}
            {loading ? <img src={spinner} alt="loading" /> : null}
        </div>
    );
};


export default MyStall;