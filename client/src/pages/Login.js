import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
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
          <Link to="/signup">← Go to Signup</Link>
          <Card className='mt-5 mx-auto shadow p-3 mb-5 bg-white rounded' style={{ width: '80%' }}>
            <Card.Body>
              <Card.Title>Login</Card.Title>
              <Form className='mx-4' onSubmit={handleFormSubmit}>
                <Card.Text className="flex-row space-between mt-4">
                  <Form.Label htmlFor="email" className='text-center'>Email: </Form.Label>
                  <Form.Control
                    style={{ width: '100vw' }}
                    placeholder="youremail@test.com"
                    name="email"
                    type="email"
                    id="email"
                    onChange={handleChange}
                  />
                </Card.Text>
                <Card.Text className="flex-row">
                  <Form.Label htmlFor="pwd">Password: </Form.Label>
                  <Form.Control
                    style={{ width: '100vw' }}
                    placeholder="******"
                    name="password"
                    type="password"
                    id="pwd"
                    onChange={handleChange}
                  />
                </Card.Text>
                {error ? (
                  <Card.Text >
                    <p className="error-text">The provided credentials are incorrect</p>
                  </Card.Text>
                ) : null}
                <div className="flex-row flex-end">
                  <Button type="submit">Submit</Button>
                </div>
              </Form>
            </Card.Body>
            <Link to='/home' style={{ textDecoration: 'none' }}>Continue as guest</Link>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
