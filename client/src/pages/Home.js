import React from "react";
import StallList from "../components/StallList";
// import CategoryMenu from "../components/CategoryMenu";
import Cart from '../components/Cart';

const Home = () => {
  return (
    <>
      <div className="container">
        <StallList />
        <Cart />
      </div>
    </>
  );
};

export default Home;
