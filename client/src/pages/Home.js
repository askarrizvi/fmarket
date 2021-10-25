import React from "react";
// import ProductList from "../components/ProductList";
// import CategoryMenu from "../components/CategoryMenu";
import Cart from '../components/Cart';
import { useQuery } from '@apollo/client'
import { QUERY_USERS } from '../utils/queries'

const Home = () => {

  const { loading, data: stallInfo } = useQuery(QUERY_USERS)

  console.log(stallInfo)

  if(loading) {
    return <h2>LOADING...</h2>
  }

  return (
    <>
      <div className="container">
        <h2>Trending Stalls:</h2>
        <Cart />

        <p>{stallInfo.name}</p>
      </div>
    </>
  );
};

export default Home;
