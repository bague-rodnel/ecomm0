import React, { Fragment, useEffect, useState } from 'react';
import { MDBDataTable } from 'mdbreact';

import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { getProductReviews, deleteReview, clearErrors } from '../../actions/productActions';
import { DELETE_REVIEW_RESET } from '../../constants/productConstants';



const ProductReviews = () => {
  const [productId, setProductId] = useState('');

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, reviews } = useSelector( state => state.productReviews );
  const { isDeleted } = useSelector( state => state.review );
  const sampleID = '611e3999c4a67c6188fe175a';

  console.log('rerendering...')
  useEffect(() => {    
    if (productId.length === sampleID.length) {
      dispatch(getProductReviews(productId));
    }    

    if (error) {
      alert.error(error);
      setProductId('');
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success('Review deleted successfully');
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, alert, error, productId, isDeleted])

  const handleDelete = (id) => {
    dispatch(deleteReview(id, productId));
  }

  const handleSubmit = (e) => {
    if (productId.length !== sampleID.length) {
      e.preventDefault();
      return alert.error("Invalid MongoDB OjbectId");
    }
    dispatch(getProductReviews(productId));
  }

  const setReviews = () => {
    const data = {
      columns: [
        { 
          label: 'Review ID',
          field: 'id',
          sort: 'asc'
        },
        {
          label: 'Rating',
          field: 'rating',
          sort: 'asc'
        },
        {
          label: 'Comment',
          field: 'comment',
          sort: 'asc'
        },
        {
          label: 'User',
          field: 'user',
          sort: 'asc'
        },
        {
          label: 'Actions',
          field: 'actions'
        }
      ],
      rows: []
    }

    reviews && reviews.forEach( review => {
      data.rows.push({
        id: review._id,
        rating: review.rating,
        comment: review.comment,
        user: review.name,
        actions:  <Fragment>
                  <button className="btn text-danger py-1 px-2 ml-2" onClick={() => handleDelete(review._id)}>
                    <i className="fa fa-trash"></i>
                  </button>
                  </Fragment> 
      }) 
    })

    return data;
  }

  return (
    <Fragment>
      <MetaData title={'Product Reviews'} />

      <div className="row pb-5">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <div className="row justify-content-center mt-5">
            <div className="col-5">
              <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <input 
                    id="reviewInput"
                    type="text" placeholder="Enter review ID" aria-label="reviewID" aria-describedby="basic-addon1"
                    className="form-control" 
                    required
                    // value={ productId }
                    onChange={(e) => setProductId(e.target.value)}
                  />
                  <button type="submit">
                    <span className="input-group-text h-100" id="basic-addon1"><i class="fas fa-search"></i></span>
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {reviews && reviews.length > 0 ? (
            <MDBDataTable 
              data={setReviews()}
              className="px-3 py-5"
              bordered
              striped
              hover
            />
          ) : (
            <p className="mt-5 text-center">No reviews to display.</p>   
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default ProductReviews
