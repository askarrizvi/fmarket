import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { ADD_STALL } from '../utils/mutations';

const AddStall = () => {

    const [formState, setFormState] = useState({ name: '', description: '' });
    const [addStall] = useMutation(ADD_STALL);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const mutationResponse = await addStall({
          variables: {
            name: formState.name,
            description: formState.description,
          },
        });
        window.location.assign('/mystall');
      };
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
          ...formState,
          [name]: value,
        });
      };
    return (
        <>
            <div className="container my-1">
                <h2>Add a new Stall</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="flex-row space-between my-2">
                        <label htmlFor="name">Stall Name:</label>
                        <input
                            placeholder="Stall Name"
                            name="name"
                            type="name"
                            id="name"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex-row space-between my-2">
                        <label htmlFor="pwd">Description</label>
                        <input
                            placeholder="Description"
                            name="description"
                            type="description"
                            id="desc"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex-row flex-end">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddStall;