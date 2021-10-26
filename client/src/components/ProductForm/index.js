import React, { useState, useEffect } from 'react';
import FileBase64 from 'react-file-base64';

const ProductForm = (props) => {
  // const [formState1, setFormState1] = useState({productname:'', description:'', image:'', category:''});
  // const [formState2, setFormState2] = useState({price:'', quantity:''});
  // const [characterCount, setCharacterCount] = useState(0);
    // const [item, setItem] = useState ({image:''})
    // const [items, setItems] = useState ([]);

    // const [addProduct, { error }] = useMutation(ADD_PRODUCT);
    // const [addProduct, { error }] = useMutation(ADD_PRODUCT);

  // const handleChange1 = event => {
  //   if (event.target.value.length <= 10) {
  //     const { name, value } = event.target;
  //     setFormState1(
  //       {... formState1, [name]: value});
  //     // setCharacterCount(event.target.value.length);
  //   }
  // const handleChange2 = event => {
  //   const { name, value } = event.target;
  //     setFormState2(
  //       {... formState2, [name]:value});
      
  //   }
  // };

    // const handleFormSubmit = async (e) => {
    //     e.preventDefault ();
        // const result = await createItem (item);

        // setItem([...items,result])
    }

    // useEffect (() => {
    //     const fetchData = async () => {
    //         const result = await getitems();
    //         console.log('fetch data;m', result)
    //         setItems (result)
    //     }
    //     fetchData ()
    // },[])

  
    return  (
      <div>
        <p> Add your Product here</p>
          <form onSubmit={handleFormSubmit}>
              {/* <p>Category</p> */}
                <div class="custom-select">
                      <select>
                        <option value='0'>Select a product category:</option>
                        <option value='Fruit'
                          name='fruit'>
                            Fruits
                        </option>
                        <option value='Veggitable'
                          name='veggitable'>
                            Veggitables
                        </option>
                      </select>
                  </div>

                  <div>
                    <input
                      className='product-input'
                      placeholder='Product name'
                      name='productname'
                      type='productname'
                      id='productname'
                      value={formState1.name}
                      onChange={handleChange1}
                    />
                  </div>

                  <div>
                      <p>Description</p>
                      {/* <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}> */}
                          {/* Character Count: {characterCount}/280 */}
                          {/* {error && <span className="ml-2">Something went wrong...</span>} */}
                      {/* </p> */}
                        <textarea
                          placeholder="add brief description of the product..."
                          className='form-input col-12 col-md-9'
                          value={formState1.description}
                          onChange={handleChange1}>
                        </textarea>
                  </div>

                  <div>
                    <input
                      className='product-input'
                      placeholder='Quantity'
                      name='quantity'
                      type='quantity'
                      id='quantity'
                      value={formState2.quantity}
                      // onChange={handleChange2}
                      />
                  </div>
                  
                  <div>
                    <input
                      className='product-input'
                      placeholder='Price/kg'
                      name='price'
                      type='price'
                      id='price'
                      value={formState2.price}
                      // onChange={handleChange2}
                      />
                  </div>



                  <p>Image</p>
                  <input
                      className='product-input'
                      placeholder='attach image here'
                      name='image'
                      type='image'
                      id='image'
                      value={formState1.image}
                      onChange={handleChange1}
                    />
                    <FileBase64
                    multiple={ false }
                    onDone={({base64}) => setItem({ ...
                      item, image: base64})} />

                    <button className='btn d-block w-100' type='submit'>
                      Submit
                    </button>
                    {/* {error && <div>attempted failed</div>} */}
          </form>
      </div>
      );
    };
    
    export default ProductForm;
