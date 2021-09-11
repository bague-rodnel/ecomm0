import React from 'react';  
import { Link } from 'react-router-dom';

//Import Image
import FooterLogo from './../images/Group-38.png';

export default function Footer(){

    return(
        <footer className="page-footer">
            <div className="color w-full  text-white ">
              <div className="xl:px-40 pb-12 lg:px-20 md:px-10 sm:px-5 px-10 pt-5">

                <div className="row">
                  
                  <div className="mt-3 cus-logo-container col-12 col-md-3 h-full">
                    <Link to="/">
                      <img src={FooterLogo} alt="Zuittzu" className="footer-logo mx-auto align-middle" />
                    </Link>
                  </div>
                  <div className="row col-12 col-md-9 mx-auto">
                    <div className="mt-3 col-12 col-sm-4 text-center">
                      <ul>
                        <li className="text-center footer-title">What We Do</li>
                        <li className="text-center"><Link to="/about" className="footer-text ">About</Link></li>
                        <li className="text-center"><Link to="/about#nutrition" className="footer-text ">Nutrition</Link></li>
                        <li className="text-center"><Link to="/about#nutrition" className="footer-text ">Ingredients</Link></li>
                      </ul>
                    </div>
                    <div className="mt-3 col-12 col-sm-4 text-center">
                      <ul>
                        <li className="text-center footer-title">Our Products</li>
                        <li className="text-center"><Link to="/search/dog" className="footer-text ">For Dogs</Link></li>
                        <li className="text-center"><Link to="/search/cat" className="footer-text ">For Cats</Link></li>
                        <li className="text-center"><Link to="/products" className="footer-text ">Treats</Link></li>
                      </ul>
                    </div>
                    <div className="mt-3 col-12 col-sm-4 text-center">
                      <ul>
                        <li className="text-center footer-title">Follow Us</li>
                        <li className="text-center"><a href="#" className="cus-icon-text"><i className="cus-icon bi bi-facebook ">Facebook</i></a></li>
                        <li className="text-center"><a href="#" className="cus-icon-text"><i className="cus-icon bi bi-twitter">Twitter</i></a></li>
                        <li className="text-center"><a href="#" className="cus-icon-text"><i className="cus-icon bi bi-instagram">Instagram</i></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </footer>

    )
}