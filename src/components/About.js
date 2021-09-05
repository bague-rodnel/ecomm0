import React from 'react';

import Pocho from './../images/group37.png';

export default function About(){



	return(

		<div className="flex  flex-wrap pt-10  pb-32" >

			  <div className="my-px px-px w-full overflow-visible  flex justify-center sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
			  	<img src={Pocho} alt="" className="hero-pocholo  sm:w-8/12 md:w-7/12  " />
			  </div>

			  <div className="my-px px-px w-full overflow-hidden sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
				<div className="about-hero-padding">
					<h2 className="about-text text-3xl font-extrabold tracking-tight sm:text-4xl">
					    <span className="block about-hero">More Than Pets.</span>
					    <span className="block about-hero">They're Family</span>		
					</h2>
					    
				</div>
				
			  </div>
		</div>	  
	)
}