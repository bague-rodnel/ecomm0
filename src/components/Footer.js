import React from 'react';

//Import Image
import FooterLogo from './../images/Group-38.png';

export default function Footer(){

    return(
        <footer className="page-footer pt-12">
            <div className="color w-full  text-white ">
              <div className="xl:px-40 pb-12 lg:px-20 md:px-10 sm:px-5 px-10">
                <div className="w-full pt-12 flex flex-col sm:flex-row space-y-2 justify-start justify-between">
                  <div className="cus-logo-container w-full sm:w-32 pr-2 flex flex-col">
                   
                    <img src={FooterLogo} alt="" className="footer-logo w-32" />
                   
                  </div>
                  <div className="cus-col w-full sm:w-1/5 flex flex-col space-y-4">
                    <a className="footer-title">Vital Pet </a>
                    <a className="footer-text">About</a>
                    <a className="footer-text">Nutrition</a>
                    <a className="footer-text">Ingredients</a>
                  </div>
                  <div className="cus-col w-full sm:w-1/5 flex flex-col space-y-4">
                    <a className="footer-title">Our Products</a>
                    <a className="footer-text">For Dogs</a>
                    <a className="footer-text">For Cats</a>
                    <a className="footer-text">Treats</a>
                  </div>
                  <div className="cus-col w-full sm:w-1/5 flex flex-col space-y-4">
                      <a className="footer-title ">Follow Us</a>
                      <i className="cus-icon bi bi-facebook ">

                        <a className="cus-icon-text">Facebook</a>

                      </i>
                      <i className="cus-icon bi bi-twitter">

                         <a className="cus-icon-text">Twitter</a>

                      </i>

                      <i className="cus-icon bi bi-instagram">

                        <a className="cus-icon-text">Instagram</a>

                       </i>

                  </div>
                </div>
              </div>
            </div>
        </footer>

    )
}