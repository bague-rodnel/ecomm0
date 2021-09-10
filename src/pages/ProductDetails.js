import React, { Fragment, useEffect, useState, useContext } from 'react';
import { Carousel, Modal, Button } from 'react-bootstrap';

import Loader from '../components/layout/Loader';
import MetaData from '../components/layout/MetaData';
import ListReviews from '../components/review/ListReviews';
import OtherProducts from '../components/OtherProducts';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'; 
import { getProductDetails, clearErrors, newReview } from '../actions/productActions';
import { addItemToCart } from '../actions/cartActions';
import { NEW_REVIEW_RESET } from '../constants/productConstants';


const ProductDetails = ({ match }) => {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, product } = useSelector(state => state.productDetails);
  const { user } = useSelector(state => state.auth);
  const { error: reviewError, success } = useSelector(state => state.newReview);
  const { cartItems } = useSelector( state => state.cart );
  // const sessionContext = useContext(SessionContext);
  // const { cartItems } = sessionContext.cart;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    dispatch(getProductDetails(match.params.id));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }
 
    if (success) {
      alert.success(`Review posted successfully`);
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch, alert, error, success, match.params.id])

  const addToCart = () => {
    const inCartNow = cartItems && cartItems.length && cartItems.find( i => i.product === match.params.id );
    const adder = inCartNow ? inCartNow.quantity : 0;
    dispatch(addItemToCart(match.params.id, quantity + adder, user));
    // sessionContext.addItemToCart(match.params.id, quantity + adder, user);
    alert.success('Item Added to Cart');
  }
  
  const decreaseQty = () => {
    const count = document.querySelector('.count');

    if (count.valueAsNumber <= 1) return;

    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  }

  async function setUserRatings() {
    await handleShow();

    const stars = document.querySelectorAll('.star');

    console.log(stars);
    stars.forEach((star, index) => {
      console.log('start ' + index)
      star.starValue = index + 1;

      ['click', 'mouseover', 'mouseout'].forEach(function(e) {
        star.addEventListener(e, showRatings);
      })
    })

    function showRatings(e) {
      console.log('showRatings invoked')
      stars.forEach((star, index) => {
        console.log('im looping')
        if (e.type === 'click') {
          if (index < this.starValue) {
            star.classList.add('orange');

            setRating(this.starValue);
          } else {
            star.classList.remove('orange');
          }
        }

        if (e.type === 'mouseover') {
          if (index < this.starValue) {
            star.classList.add('yellow');
          } else {
            star.classList.remove('yellow');
          }
        }

        if (e.type === 'mouseout') {
          star.classList.remove('yellow');
        }
      })
    }
    console.log('im done')
  }

  const handleReview = () => {
    
    const formData = new FormData();

    formData.set('rating', rating);
    formData.set('comment', comment);
    formData.set('productId', match.params.id);

    dispatch(newReview(formData));
  }

  const increaseQty = () => {
    const count = document.querySelector('.count');

    if (count.valueAsNumber >= product.stock) return;

    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  }


  return (
    <Fragment>
    <div className="container container-fluid  pb-12">
    { loading ? <Loader /> : (
      product && <Fragment>
        <div className="row f-flex justify-content-around">
          <div className="col-12 col-lg-5 img-fluid" id="product_image">
            <Carousel pause="hover">
              { product.images && product.images.map( image => (
                <Carousel.Item key={image.public_id}>
                  <img src={image.url} alt={product.title} className="d-block w-100" />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>

          <div className="col-12 col-lg-5 mt-5">
            <h3 className="h3">{ product.name }</h3>
            <p className="italic text-gray-500 mb-3">Product # {product._id}</p>

            <div className="rating-outer mb-3">
                <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%`}}></div>
            </div>
            <span>({product.numOfReviews} Reviews)</span>


            <p className="h4 my-3">${product.price}</p>

          { user && !user.isAdmin ?
            <div className="d-flex">
              <div className="d-inline d-flex">
                <span className="btn btn-secondary minus" onClick={decreaseQty}>
                <i class="fas fa-minus"></i>
                </span>

                <input 
                  type="number" 
                  className="count form-control w-20" 
                  value={ quantity }
                  readOnly />

                <span className="btn btn-secondary plus" onClick={increaseQty}>
                  <i className="fas fa-plus"></i>
                </span>
              </div>
              <button 
                onClick={addToCart}
                type="button" 
                id="cart_btn" 
                className="btn theme--bg text-white d-inline ml-4"
                disabled={ product.stock === 0 || !user || user.isAdmin === true}
              >
                Add to Cart
              </button>
            </div>
            : <></>
          }
            


            <p>Status: <span id="stock_status" className={ product.stock > 0 ? 'text-success' : 'text-danger' }>{ product.stock > 0 ? 'In Stock' : 'Out of stock' }</span></p>


            <h4 className="mt-2 italic text-gray-400">Description:</h4>
            <p>{product.description}</p>
            
            { 
              !user ? 
              <div className="alert alert-danger mt-5" type="alert">Login to post your review.</div>
              : 
              !user.isAdmin &&
              <Button type="button" 
                className="btn mt-4 theme--bg" 
                  data-toggle="modal" 
                  data-target="#ratingModal"
                onClick={setUserRatings}
                >
                Submit Your Review
              </Button>
            }
            
          
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title><h5 className="modal-title" id="ratingModalLabel">Submit Review</h5></Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ul className="stars d-inline-flex" >
                  <li className="star"><i className="fa fa-star"></i></li>
                  <li className="star"><i className="fa fa-star"></i></li>
                  <li className="star"><i className="fa fa-star"></i></li>
                  <li className="star"><i className="fa fa-star"></i></li>
                  <li className="star"><i className="fa fa-star"></i></li>
                </ul>
                <textarea 
                  name="review" 
                  id="review" 
                  className="form-control mt-3"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}>
                </textarea>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={() => {handleReview();handleClose();}}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>

        { product.reviews && product.reviews.length > 0 && (
          <ListReviews reviews={ product.reviews } />
        )}
      </Fragment>
    )}
    </div>

    { !loading && <OtherProducts category={product.category} />}
    </Fragment>
  )
}

export default ProductDetails
