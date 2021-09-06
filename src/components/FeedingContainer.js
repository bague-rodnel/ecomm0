import React from 'react';
import Cat from './CatBanner';

export default function HereSection(){

	return(

		<div className="pb-10">
			<div className="container-fluid cus-container py-5 ">
			<div className="row align-items-center justify-content-center">
				<div className="col-md-4 col-12">
					<h2 className="about-title">Feeding Them Right</h2>
					<p className="about-text">Zuittzu Pet started with the core philosphy that "All pets are family." Our team's collective dream, is a world in which animal companions live long and healthy lives.</p>
					<p className="about-text">Together we strive for this goal, one get bowl at a time. Our dedicated nutritionists have spent hours crafting the besst and healthiest recipes for your pet's needs.</p>
					<p className="about-text">Ony the best for your bestfriend. Zuittzu Pet.</p>
				</div>
				<div className="col-md-4 col-12">
					<Cat />
				</div>
			</div>
		</div>
		</div>

	)
}