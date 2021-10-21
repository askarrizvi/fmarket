import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = (props) => {
  const [login, { error }] = useMutation(LOGIN_USER);
  const [formState, setFormState] = useState({ email: '', password: '' });

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
const handleFormSubmit = async event => {
  event.preventDefault();

  try {
    const { data } = await login({
      variables: { ...formState }
    });
    Auth.login(data.login.token);
    console.log(data);
  } catch (e) {
    console.error(e);
  }
};
  return (
    <main>
      <div>
        <div className='card'>
          <h4 className='card-header'>Login</h4>
          <div className='card-body'>
            <form onSubmit={handleFormSubmit}>
              <input
                className='form-input'
                placeholder='Your email'
                name='email'
                type='email'
                id='email'
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className='form-input'
                placeholder='your password here'
                name='password'
                type='password'
                id='password'
                value={formState.password}
                onChange={handleChange}
              />
              <button type='submit'>
                Log In
              </button>{error && <div>Login failed</div>}
              <p> Forgot Password?</p>
              <button type='submit'>
              <Link to="/signup">Create new Account</Link>
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
