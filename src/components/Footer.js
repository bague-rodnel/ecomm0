import React from 'react';  

//Import Image
import FooterLogo from './../images/Group-38.png';

export default function Footer(){

    return(
        <footer className="page-footer">
            <div className="color w-full  text-white ">
              <div className="xl:px-40 pb-12 lg:px-20 md:px-10 sm:px-5 px-10 pt-5">

                <div className="row">
                  
                  <div className="mt-3 cus-logo-container col-12 col-md-3 h-full">
                    <img src={FooterLogo} alt="" className="footer-logo w-full mx-auto align-middle" />
                  </div>
                  <div className="row col-12 col-md-9 mx-auto">
                    <div className="mt-3 col-12 col-sm-4 text-center">
                      <ul>
                      <li className="text-center"><a className="footer-title">Vital Pet </a></li>
                      <li className="text-center"><a className="footer-text ">About</a></li>
                      <li className="text-center"><a className="footer-text ">Nutrition</a></li>
                      <li className="text-center"><a className="footer-text ">Ingredients</a></li>
                      </ul>
                    </div>
                    <div className="mt-3 col-12 col-sm-4 text-center">
                      <ul>
                      <li className="text-center"><a className="footer-title">Our Products</a></li>
                      <li className="text-center"><a className="footer-text ">For Dogs</a></li>
                      <li className="text-center"><a className="footer-text ">For Cats</a></li>
                      <li className="text-center"><a className="footer-text ">Treats</a></li>
                      </ul>
                    </div>
                    <div className="mt-3 col-12 col-sm-4 text-center">
                      <ul>
                        <li className="text-center"><a className="footer-title ">Follow Us</a></li>
                        <li className="text-center"><a className="cus-icon-text"><i className="cus-icon bi bi-facebook ">Facebook</i></a></li>
                        <li className="text-center"><a className="cus-icon-text"><i className="cus-icon bi bi-twitter">Twitter</i></a></li>
                        <li className="text-center"><a className="cus-icon-text"><i className="cus-icon bi bi-instagram">Instagram</i></a></li>
                        
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </footer>

    )
}