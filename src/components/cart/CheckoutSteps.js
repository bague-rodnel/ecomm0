import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {
  return (
    <div className="small checkout-progress d-flex justify-content-center mt-5">
      {shipping ? <Link to="/order/shipping" className="float-right">
          <div className="triangle2-active hidden--sm"></div>
          <div className="step active-step">Shipping</div>
          <div className="triangle-active hidden--sm"></div>
        </Link> : <Link to="#!" disabled>
          <div className="triangle2-incomplete .hidden--sm"></div>
          <div className="step incomplete">Shipping</div>
          <div className="triangle-incomplete .hidden--sm"></div>
        </Link>
      }
      <p>&nbsp;</p>
      {confirmOrder ? <Link to="/order/confirm" className="float-right">
          <div className="triangle2-active hidden--sm"></div>
          <div className="step active-step">Confirm</div>
          <div className="triangle-active hidden--sm"></div>
        </Link> : <Link to="#!" disabled>
          <div className="triangle2-incomplete hidden--sm"></div>
          <div className="step incomplete">Confirm</div>
          <div className="triangle-incomplete hidden--sm"></div>
        </Link>
      }
      <p>&nbsp;</p>
      {payment ? <Link to="/order/confirm" className="float-right">
          <div className="triangle2-active hidden--sm"></div>
          <div className="step active-step">Pay</div>
          <div className="triangle-active hidden--sm"></div>
        </Link> : <Link to="#!" disabled>
          <div className="triangle2-incomplete hidden--sm"></div>
          <div className="step incomplete">Pay</div>
          <div className="triangle-incomplete hidden--sm"></div>
        </Link>
      }
    </div>
  ) 
}
  
export default CheckoutSteps;