import React from 'react';
import Pochollo from './../images/Pocholo_and_Frame.png';
import { Link } from 'react-router-dom'
import PocholoBanner from './PocholoBanner';

export default function HereSection(){

	return(

		<div className="container py-5">
			<div className="row align-items-center justify-content-center">
				<div className="col-md-4 col-8 text-right mb-5 mb-md-0">
					<PocholoBanner/>
				</div>
				<div className="offset-md-1 col-md-6 col-12">
					<h2 className="text-3xl font-extrabold tracking-tight text-hero pb-3">We Care About Your Pet</h2>
					<p className="hero-paragraph pb-4">Our special formula mirrors what your pets naturally eat in the wild. Our high-protein, low carb pet food ensures your pet's nutrition needs are well met.</p>
					<div className="d-flex justify-content-center">
						<Link to="/products" className="cuz-button justify-content-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-black hover:bg-blue-500">SHOP NOW</Link>
					</div>
				</div>
			</div>
		</div>

	)
}