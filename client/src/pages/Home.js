import React, { useState } from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from '../components/Cart';

const Home = () => {
  return (
<div className="container">
<h2>Trending Stalls:</h2>
<Cart />
</div>
  );
};

export default Home;
