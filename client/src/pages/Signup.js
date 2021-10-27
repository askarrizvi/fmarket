import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '', username: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        username: formState.username,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (

    <Container>
      <Row>
        <Col xs={12} lg={4}></Col>
        <Col xs={12} lg={4}><img src='/images/fmarketlogoblack.jpg' alt='f market logo' style={{ marginTop: '5rem', width: '15rem' }}></img></Col>
        <Col xs={12} lg={4}>
            <Link to="/">← Go to Login</Link>

            <Card className='mt-5 mx-auto shadow p-3 mb-5 bg-white rounded' style={{ width: '80%' }}>
              <Card.Body>
                <Card.Title>Signup</Card.Title>
                <Card.Text>
                <Form className='mx-4' onSubmit={handleFormSubmit}>
                  <div className="flex-row space-between my-2">
                    <Form.Label htmlFor="firstName">First Name:</Form.Label>
                    <Form.Control
                      style={{ width: '100vw' }}
                      placeholder="First"
                      name="firstName"
                      type="firstName"
                      id="firstName"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex-row space-between my-2">
                    <Form.Label htmlFor="lastName">Last Name:</Form.Label>
                    <Form.Control
                      style={{ width: '100vw' }}
                      placeholder="Last"
                      name="lastName"
                      type="lastName"
                      id="lastName"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex-row space-between my-2">
                    <Form.Label htmlFor="email">Email:</Form.Label>
                    <Form.Control
                      style={{ width: '100vw' }}
                      placeholder="youremail@test.com"
                      name="email"
                      type="email"
                      id="email"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex-row space-between my-2">
                    <Form.Label htmlFor="username">User Name:</Form.Label>
                    <Form.Control
                      style={{ width: '100vw' }}
                      placeholder="username"
                      name="username"
                      type="username"
                      id="username"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex-row space-between my-2">
                    <Form.Label htmlFor="pwd">Password:</Form.Label>
                    <Form.Control
                      style={{ width: '100vw' }}
                      placeholder="******"
                      name="password"
                      type="password"
                      id="pwd"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex-row flex-end">
                    <Button type="submit">Submit</Button>
                  </div>
                </Form>
                </Card.Text>
              </Card.Body>
              <Link to='/home' style={{ textDecoration: 'none' }}>Continue as guest</Link>
            </Card>
        </Col>
      </Row>
    </Container>


  );
}

export default Signup;