import React from "react";
import { Link } from "react-router-dom";

const Splash = () => {
  return (
      <><span>Placeholder for splash screen</span>
      <Link to={`/home`}>
          <p>Click here to go to homepage</p>
      </Link>
      <Link to={`/test`}>
          <p>Click here to go to GQL Test Page</p>
      </Link></>
  );
};

export default Splash;
