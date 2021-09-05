import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';

import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts, deleteProduct, archiveProduct, unarchiveProduct, clearErrors } from '../../actions/productActions';
import { DELETE_PRODUCT_RESET, ARCHIVE_PRODUCT_RESET, UNARCHIVE_PRODUCT_RESET } from '../../constants/productConstants';

// import './admin.css';

const ProductsList = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector( state => state.allProducts );
  const { error: putError, isDeleted, isArchived, isUnarchived  } = useSelector( state => state.product );  

  useEffect(() => {
    dispatch(getAdminProducts());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (putError) {
      alert.error('Failed to update product');
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success('Product deleted successfully');
      history.push('/admin/products');
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    if (isArchived) {
      alert.success('Product archived successfully');
      history.push('/admin/products');
      dispatch({ type: ARCHIVE_PRODUCT_RESET });
    }

    if (isUnarchived) {
      alert.success('Product unarchived successfully');
      history.push('/admin/products');
      dispatch({ type: UNARCHIVE_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, putError, isDeleted, isArchived, isUnarchived, history ])

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: 'Photo',
          field: 'photo'
        },
        { 
          label: 'ID',
          field: 'id',
          sort: 'asc'
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc'
        },
        {
          label: 'Price',
          field: 'price',
          sort: 'asc'
        },
        {
          label: 'Stock',
          field: 'stock',
          sort: 'asc'
        },
        {
          label: 'Actions',
          field: 'actions'
        }
      ],
      rows: []
    }

    products && products.forEach( product => {
      data.rows.push({
        photo: <Link to={`/products/${product._id}`}><img src={product.images[0] && product.images[0].url} alt="product" width="80" /></Link>,
        id: product._id,
        name: product.name,
        price: `$${product.price}`,
        stock: product.stock,
        actions:  <Fragment>
                  <Link to={`/admin/products/${product._id}`} className="btn py-1 px-2" style={{ color: 'darkorange' }}>
                    <i className="fas fa-pencil-alt"></i>
                  </Link>
                  { product.isActive ? (
                    <Link to="#!" onClick={() => handleArchive(product._id)} className="btn text-success py-1 px-2">
                      <i className="fas fa-toggle-on"></i>
                    </Link>
                  ) : (
                    <Link to="#!" onClick={() => handleUnarchive(product._id)} className="btn text-secondary py-1 px-2">
                      <i className="fas fa-toggle-off"></i>
                    </Link>
                  )}
                  <Link to="#!" onClick={() => handleDelete(product._id)} className="btn text-danger py-1 px-2 ml-2">
                    <i className="fas fa-trash"></i>
                  </Link>
                  </Fragment> 
      }) 
    })

    return data;
  }

  const handleArchive = (id) => {
    dispatch(archiveProduct(id));
  }

  const handleUnarchive = (id) => {
    dispatch(unarchiveProduct(id));
  }

  const handleDelete = (id) => {
    const confirmed = window.confirm("You're about to delete the product. Are you sure?");
    if (confirmed)
      dispatch(deleteProduct(id));
  }

  const handleToggle = (product) => {
    if (product.isActive) {
      dispatch(archiveProduct(product._id));
    } else {
      dispatch(unarchiveProduct(product._id));
    }
  }

  return (
    <Fragment>
      <MetaData title={'All Products'} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5 display-5">All Products</h1>

            { loading ? <Loader /> 
              : (
                <MDBDataTable 
                  data={setProducts()}
                  className="px-3"
                  bordered
                  striped
                  hover
                />
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  )
}

export default ProductsList;