import React from 'react';
import Pochollo from './../images/Pocholo_and_Frame.png';
import Pocho from './PochoBannerAbout';

export default function HereSection(){

	return(


		<div className="container py-5">
			<div className="row align-items-center justify-content-center">
				<div className="col-md-4 col-8 text-right mb-5 mb-md-0">
					<Pocho/>
				</div>
				<div className="offset-md-1 col-md-6 col-12">
					<h2 className="text-3xl font-extrabold tracking-tight text-hero pb-3">More Than Pets</h2>
					<h2 className="text-3xl font-extrabold tracking-tight text-hero pb-3">They're Family.</h2>
					
				</div>
			</div>
		</div>

	)
}