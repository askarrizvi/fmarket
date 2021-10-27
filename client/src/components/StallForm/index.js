import React, { useState, useEffect } from 'react';
import FileBase64 from 'react-file-base64';
import { useMutation } from '@apollo/client'
import { ADD_STALL } from '../../utils/mutations';

const StallForm = (props) => {
    const [addStall, { error }] = useMutation(ADD_STALL);
    const [formState, setFormState] = useState({ name: '', upvote:'0', image: '' });
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
    try {
      // execute addUser mutation and pass in variable data from form
      const { data } = await addStall({
        variables: { ...formState,  }
      });
      console.log(data);
    } catch (e) {
      console.error(e);
    }
    window.location.replace('products') 
    .then(window.reload()) 
  }
  
    return (
        <div>
       <h2>Add New Stall (This action will lose your previous spot)</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="name">Stall Name:</label>
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
          <label htmlFor="upvote"> Upvote:</label>
          <input
            placeholder="upvote"
            name="upvote"
            type="upvote"
            id="upvote"
            value={0}
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
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
        {error && <div>Failed!</div>}
      </form>
    </div>
  );
}
    
    export default StallForm;
