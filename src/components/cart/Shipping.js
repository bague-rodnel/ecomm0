import React, { Fragment, useEffect, useState } from 'react';
import { countries } from 'countries-list';

import MetaData from '../layout/MetaData';
import CheckoutSteps from './CheckoutSteps';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingInfo } from '../../actions/cartActions';


const Shipping = ({ history }) => {
  const countriesList = Object.values(countries)

  const { shippingInfo } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.auth);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [country, setCountry] = useState(shippingInfo.country);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(saveShippingInfo({ address, city, phoneNo, postalCode, country }, user));
    history.push('/order/confirm');
  } 
  return (
    <Fragment>
      <MetaData title={'Shipping Info'} />
      
      <div className="container container-fluid">
      <CheckoutSteps shipping />
      <div className="row wrapper">
        <div className="col-12 col-lg-7 mx-auto">
          <form className="shadow-lg my-2 py-4 py-lg-5 px-4 px-lg-5" 
            onSubmit={handleSubmit}>
            <h3 className="mb-4 h3">Shipping Info</h3>
            <div className="form-group mb-3">
              <label htmlFor="address_field">Address</label>
              <input
                  type="text"
                  id="address_field"
                  className="form-control"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="city_field">City</label>
              <input
                  type="text"
                  id="city_field"
                  className="form-control"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="phone_field">Phone No</label>
              <input
                  type="phone"
                  id="phone_field"
                  className="form-control"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  required
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="postal_code_field">Postal Code</label>
              <input
                  type="number"
                  id="postal_code_field"
                  className="form-control"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="country_field">Country</label>
              <select
                  id="country_field"
                  className="form-control"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
              >

              { countriesList.map( country => (
                <option key={country.name} value={country.name}> 
                  {country.name}
                </option>
              ))}

              </select>
            </div>

            <button
              type="submit"
              className="btn btn-success"
            >
            CONTINUE
            </button>
          </form>
        </div>
      </div>
      </div>
    </Fragment>
  )
}

export default Shipping;
