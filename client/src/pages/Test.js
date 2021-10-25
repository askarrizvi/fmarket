import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from "react-router-dom";

import { useStoreContext } from '../utils/GlobalState';
import { QUERY_PRODUCTS } from '../utils/queries';
import { UPDATE_PRODUCTS } from '../utils/actions'

const Test = () => {
    const [state, dispatch] = useStoreContext();
    const { loading, data } = useQuery(QUERY_PRODUCTS);
    const products = data?.products || [];
    /*while(loading){
    console.log(loading);
    }*/
    useEffect(() => {
        if (data) {
            dispatch({
                type: UPDATE_PRODUCTS,
                products: data.products
            });
        }
    }, [data, loading, dispatch]);

    console.log(state.products);

    function filterProducts() {
        return state.products;
    }

    return (
        <><span>GQL Test Page</span>
            {products.length ? (
                <div className="flex-row">
                    <span>{products[1].name}</span>
                </div>
            ) : (
                <h3>You haven't added any products yet!</h3>
            )}
        </>
    );
};

export default Test;
