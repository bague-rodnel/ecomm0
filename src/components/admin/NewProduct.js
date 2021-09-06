import React, { Fragment, useEffect, useState } from 'react';

import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { newProduct, clearErrors } from '../../actions/productActions';
import { NEW_PRODUCT_RESET } from '../../constants/productConstants'; 

const NewProduct = ({ history }) => {

  const categories = [
    "Dogs",
    "Cats"
  ];

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [stock, setStock] = useState(1);
  const [filters, setFilters] = useState('');
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);


  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector( state => state.newProduct );
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      history.push("/admin/products");
      alert.success('Product created successfully');
      dispatch({ type: NEW_PRODUCT_RESET });
    }

  }, [dispatch, alert, error, success, history]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('name', name);
    formData.set('price', price);
    formData.set('description', description);
    formData.set('category', category);
    formData.set('filters', filters);
    formData.set('stock', stock);

    images && images.forEach( image => {
      formData.append('images', image);
    })

    console.log('images variable: ', images);
    console.log('images FormData: ', formData.images);
    console.log('FormData: ', formData);
    dispatch(newProduct(formData));
  }

  const onChange = (e) => {

    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);
     
    files.forEach( file => {
      const reader = new FileReader();

      reader.onload = () => {
        // 0 - created, 1 - processing?, 2 - done
        if (reader.readyState === 2) {
          setImagesPreview(oldArray => [...oldArray, reader.result]);
          setImages(oldArray => [...oldArray, reader.result]);
        }
      } 

      reader.readAsDataURL(file);
    })

  }

  return (
    <Fragment>
      <MetaData title={'New Product'} />
      <div className="row pb-5">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <div className="wrapper my-5"> 
              <form className="shadow-lg py-4 px-3 mr-5" 
                onSubmit={handleSubmit} 
                encType='multipart/form-data'>
                
                <h1 className="mb-4 h4">New Product</h1>

                <div className="form-group">
                  <label htmlFor="name_field">Name</label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price_field">Price</label>
                  <input
                    type="number"
                    id="price_field"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description_field">Description</label>
                  <textarea 
                    className="form-control" 
                    id="description_field" 
                    rows="8"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}>
                  </textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="filters_field">Filter Tags</label>
                  <input
                    required
                    type="text"
                    id="filters_field"
                    className="form-control"
                    value={filters}
                    onChange={(e) => setFilters(e.target.value)}
                    title="Comma separated tags"
                  />
                </div>


                <div className="form-group">
                  <label htmlFor="category_field">Category</label>
                  <select className="form-control" id="category_field" value={category}
                    onChange={(e) => setCategory(e.target.value)}>
                    {categories.map( category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="stock_field">Stock</label>
                  <input
                    type="number"
                    id="stock_field"
                    className="form-control"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>
                  
                <div className='form-group'>
                  <label>Images</label>
                    
                  <div className='custom-file'>
                    <input
                      type='file'
                      name='product_images'
                      className='custom-file-input'
                      id='customFile'
                      // accept="images/*"
                      multiple
                      onChange={onChange}
                    />
                    <label className='custom-file-label' htmlFor='customFile'>
                      Choose Images
                    </label>
                  </div>


                  {imagesPreview.map( img => (
                    <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="100" height="100" />
                  ))}
                </div>
      
                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-success"
                  disabled={ loading ? true : false }
                >
                  CREATE
                </button>
              </form>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  )
}

export default NewProduct;
