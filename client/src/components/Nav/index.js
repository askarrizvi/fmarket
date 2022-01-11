import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

import { Card, Col, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (

        <ul style={{ listStyleType: 'none' }} className="flex-row">
          <Col xs={12} md={6} className='mt-4'>
            <li className="mx-auto">
              <Link style={{ textDecoration: 'none' }} to="/mystall">
                My Stall
              </Link>
            </li>
          </Col>
          <Col xs={12} md={6} className='mt-4'>
            <li className="mx-auto">
              {/* this is not using the Link component to logout or user and then refresh the application to the start */}
              <a style={{ textDecoration: 'none' }} href="/" onClick={() => Auth.logout()}>
                Logout
              </a>
            </li>
          </Col>
        </ul>
      );
    } else {
      return (
        <ul style={{ listStyleType: 'none' }} className="flex-row">
          <li className="mx-1">
            <Link style={{ textDecoration: 'none' }} to="/signup">
              Signup
            </Link>
          </li>
          <li className="mx-1">
            <Link style={{ textDecoration: 'none' }} to="/">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex-row px-1">
      <Row>
        <Col xs={12} md={6}>
          <h1>
            <Link to="/home">
              <img
                src={`/images/fmarketlogowhitetran.png`}
                alt='FMarket Icon'
              />
            </Link>
          </h1>
        </Col>
        <Col xs={12} md={6}>
          <nav>
            {showNavigation()}
          </nav>
        </Col>
      </Row>
    </header>
  );
}

export default Nav;
