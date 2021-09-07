import React, { Fragment, useEffect, useState } from 'react';
import { MDBDataTable } from 'mdbreact';

import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, updateProduct, clearErrors } from '../../actions/productActions';
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants'; 



const UpdateProduct = ({ match, history }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState(0);
  const [filters, setFilters] = useState('');
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Cats",
    "Dogs"
  ];

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, product } = useSelector( state => state.productDetails );
  const { loading, error: updateError, isUpdated } = useSelector( state => state.product );

  const productId = match.params.id;

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setFilters(product.filters);
      setStock(product.stock);
      setOldImages(product.images);  
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      history.push("/admin/products");
      alert.success('Product updated successfully');
      dispatch(getProductDetails(productId));
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }

  }, [dispatch, alert, error, isUpdated, history, updateError, product, productId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('name', name);
    formData.set('price', price);
    formData.set('description', description);
    formData.set('category', category);
    formData.set('stock', stock);
    formData.set('filters', filters);

    images && images.forEach( image => {
      formData.append('images', image);
    })

    dispatch(updateProduct(product._id, formData));
  }

  const onChange = (e) => {

    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);
    setOldImages([]);
     
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
      <MetaData title={'Update Product'} />
      <div className="row pb-5">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>

            <div className="wrapper my-5 mr-3"> 
              <form className="shadow-lg px-5 py-5" 
                onSubmit={handleSubmit} 
                encType='multipart/form-data'>
                
                <h1 className="mb-4 h4">Update Product</h1>

                <div className="form-group mb-3">
                  <label htmlFor="name_field">Name</label>
                  <input
                    required
                    type="text"
                    id="name_field"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="price_field">Price</label>
                  <input
                    required
                    type="text"
                    id="price_field"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="description_field">Description</label>
                  <textarea 
                    required
                    className="form-control" 
                    id="description_field" 
                    rows="8"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}>
                  </textarea>
                </div>

                <div className="form-group mb-3">
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

                <div className="form-group mb-3">
                  <label htmlFor="category_field">Category</label>
                  <select className="form-control" id="category_field" value={category}
                    onChange={(e) => setCategory(e.target.value)}>
                    {categories.map( category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="stock_field">Stock</label>
                  <input
                    required
                    type="number"
                    id="stock_field"
                    className="form-control"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                  
                <div className='form-group mb-5'>
                  <label>Images</label>
                    
                  <div className='custom-file'>
                    <input
                      type='file'
                      name='product_images'
                      className='custom-file-input'
                      id='customFile'
                      multiple
                      onChange={onChange}
                    />
                    <label className='custom-file-label' htmlFor='customFile'>
                      Choose Images
                    </label>
                  </div>

                  {oldImages && oldImages.map( img => (
                    <img src={ img.url } alt={ img.url } key={ img } className="mt-3 mr-2" width="100" />
                  ))}

                  {imagesPreview.map( img => (
                    <img src={ img } key={ img } alt="Images Preview" className="mt-3 mr-2" width="100" />
                  ))}
                </div>
      
                <button
                  type="submit"
                  className="btn text-white theme--bg"
                  disabled={ loading ? true : false }
                >
                  UPDATE
                </button>
              </form>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  )
}

export default UpdateProduct;
