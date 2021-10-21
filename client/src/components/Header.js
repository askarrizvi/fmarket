import React from 'react';

import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };
  
  return (
    <header className="bg-secondary mb-4 py-2 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link to="/">
          <h1>Fmarket</h1>
        </Link>

        <nav className="text-center">
        {Auth.loggedIn() ?  (
          <>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/mystall">My Stall</Link>
                <Link to="/mycart">My Cart</Link>
            <a href="/"  onClick={logout}>
              Logout
            </a>
          </>
        ):null}
        </nav>
      </div>
    </header>
  );
};

export default Header;
