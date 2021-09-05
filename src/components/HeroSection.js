import React from 'react';
import Pochollo from './../images/Pocholo_and_Frame.png';
import { Link } from 'react-router-dom'

export default function HereSection(){

	return(

		
			<div className="flex  flex-wrap   pb-52">

			  <div className="my-px px-px w-full overflow-visible  flex justify-center sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
			  	<img src={Pochollo} alt="" className="hero-pocholo  sm:w-8/12 md:w-7/12  " />
			  </div>

			  <div className="my-px px-px w-full overflow-hidden sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
				<div className="cuz-padding">
					<h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
					    <span className="block text-hero">We Care About Your Pet</span> 		
					</h2>
					        	<p className="hero-paragraph">
										Our special formula mirrors what your pets naturally eat in the wild.
										Our high-protein, low carb pet food ensures your pet's nutrition needs
										are well met.

								</p>


						<div className="pt-5 flex justify-center rounded-md ">
						    <Link
						       to="/products"
						        className="cuz-button inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-black hover:bg-blue-500 "
                 >
						         SHOP NOW
						    </Link>
					   </div>
				</div>
				
			  </div>

			</div>
		


	)
}