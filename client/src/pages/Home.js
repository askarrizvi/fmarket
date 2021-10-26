import React from "react";
import StallList from "../components/StallList";
// import CategoryMenu from "../components/CategoryMenu";
import Cart from '../components/Cart';
import MyStall from "./MyStall";

const Home = () => {
  return (
    <>
      <div className="container">
        <StallList />
        <Cart />
        {/* <MyStall/> */}
      </div>
    </>
  );
};

export default Home;
