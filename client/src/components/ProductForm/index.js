import React, { useState, useEffect } from 'react';
import FileBase64 from 'react-file-base64';
import { useMutation } from '@apollo/client'
import { ADD_PRODUCT } from '../../utils/mutations';

const ProductForm = (props) => {
    // const [addProduct, { error }] = useMutation(ADD_PRODUCT);
    const [formState, setFormState] = useState({ product: '', description:'0', image: '', category:'' });
    const [item, setItem] = useState ({image:''})
    // const [items, setItems] = useState ([]);
  
    // update state based on form input changes
    const handleChange = (event) => {
      const { name, value } = event.target;
  
      setFormState({
        ...formState,
        [name]: value,
      });
    };
  
   // submit form (notice the async!)
  const handleFormSubmit = async event => {
    event.preventDefault();
  
    // use try/catch instead of promises to handle errors
    // try {
    //   // execute addUser mutation and pass in variable data from form
    //   const { data } = await addProduct({
    //     variables: { ...formState,  }
    //   });
    //   console.log(data);
    // } catch (e) {
    //   console.error(e);
    // }
    window.location.replace('/home') 
    .then(window.reload()) 
  }
  
    return (
        <div>
       <h2>Add Your Products </h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="name">Product:</label>
          <input
            placeholder="name"
            name="name"
            type="name"
            id="name"
            value={formState.name}
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="upvote"> Description:</label>
          <input
            placeholder="description"
            name="description"
            type="description"
            id="description"
            value={formState.description}
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="image">Image:</label>
          <input
            placeholder="url"
            name="image"
            type="image"
            id="image"
            value={formState.image}
            onChange={handleChange}
          />
        </div>
        <FileBase64
                    multiple={ false }
                    onDone={({base64}) => setItem({ ...
                      item, image: base64})} />
        <div className="flex-row space-between my-2">
          <label htmlFor="category"> Category:</label>
          <input
            placeholder="Fruit/Veggitable"
            name="category"
            type="category"
            id="category"
            value={formState.category}
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
        {/* {error && <div>Failed!</div>} */}
      </form>
    </div>
  );
}
    
    export default ProductForm;
