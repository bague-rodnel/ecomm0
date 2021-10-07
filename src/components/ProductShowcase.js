import React from "react";

import Product from "./../products/products1.png";

export default function ProductShowcase() {
  return (
    <div className="pb-12">
      <div className="my-px px-px w-full flex justify-center sm:w-full md:w-full lg:w-full xl:w-full">
        <img src={Product} alt="" className="m:w-1/2 " />
      </div>
      <div className="my-px px-px w-full flex justify-center sm:w-full md:w-full lg:w-full xl:w-full">
        <span className="cus-span">"Only The Best, For Your Best Friend"</span>
      </div>
    </div>
  );
}
