import React, { Component } from "react";
import Slider from "react-slick";

//Carousel Images
import catTreats from './../carousel-image/cat-treats.png';
import dogTreats from './../carousel-image/dog-treats.png';
import wetCat from './../carousel-image/wet-cat-mxpoultry.png';
import catSalmon from './../carousel-image/wet-cat-salmon.png';
import wetDog from './../carousel-image/wet-dog-beef-stew.png';
import dog from './../carousel-image/wet-dog-turkpotat.png';



export default function Carousel() {
 
    var settings = {
      dots: true,
      dotsClass: "slick-dots slick-thumb",
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 3000,
      autoplaySpeed: 3000,
      cssEase: "linear",
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };



    return (
      <div className="container-fluid py-5">
        <div className="row justify-content-center">
          <Slider {...settings}>
            <div className="text-center text-carousel">
              <div className="container">
                <div className="row align-items-center justify-content-center">
                  <div className="col">
                    <img src={catTreats} alt="" />
                  </div>
                  <div className="col">
                    <h3 >Satisfy Your Pet</h3>
                    <a href="#" className="cuz-button inline-flex items-center justify-center px-md-5 py-md-3 p-2 border border-transparent text-base font-medium rounded-md text-black hover:bg-blue-500">Learn More</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center text-carousel">
              <div className="container">
                <div className="row align-items-center justify-content-center">
                  <div className="col">
                    <img src={wetCat} alt="" />
                  </div>
                  <div className="col">
                    <h3>Amazing FLAVORS</h3>
                    <a href="#" className="cuz-button inline-flex items-center justify-center px-md-5 py-md-3 p-2 border border-transparent text-base font-medium rounded-md text-black hover:bg-blue-500">Learn More</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center text-carousel">
              <div className="container">
                <div className="row align-items-center justify-content-center">
                  <div className="col">
                    <img src={dog} alt="" />
                  </div>
                  <div className="col">
                    <h3>Amazing FLAVORS</h3>
                    <a href="#" className="cuz-button inline-flex items-center justify-center px-md-5 py-md-3 p-2 border border-transparent text-base font-medium rounded-md text-black hover:bg-blue-500">Learn More</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center text-carousel">
              <div className="container">
                <div className="row align-items-center justify-content-center">
                  <div className="col">
                    <img src={dogTreats} alt="" />
                  </div>
                  <div className="col">
                    <h3>Treat them to Treats</h3>
                    <a href="#" className="cuz-button inline-flex items-center justify-center px-md-5 py-md-3 p-2 border border-transparent text-base font-medium rounded-md text-black hover:bg-blue-500">Learn More</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center text-carousel">
              <div className="container">
                <div className="row align-items-center justify-content-center">
                  <div className="col">
                    <img src={wetDog} alt="" />
                  </div>
                  <div className="col">
                    <h3>Treat them to Treats</h3>
                    <a href="#" className="cuz-button inline-flex items-center justify-center px-md-5 py-md-3 p-2 border border-transparent text-base font-medium rounded-md text-black hover:bg-blue-500">Learn More</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center text-carousel">
              <div className="container">
                <div className="row align-items-center justify-content-center">
                  <div className="col">
                    <img src={catSalmon} alt="" />
                  </div>
                  <div className="col">
                    <h3>Treat them to Treats</h3>
                    <a href="#" className="cuz-button inline-flex items-center justify-center px-md-5 py-md-3 p-2 border border-transparent text-base font-medium rounded-md text-black hover:bg-blue-500">Learn More</a>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    );
  
}