import React from 'react';

import NutritionLarge from './../images/Nutrition_graphic.jpg';
import NutritionSmall from './../images/Nutrition_graphic_sm.jpg';



export default function Nutrition(){


	return(

		<div id="nutrition" className="container py-5">
			<div className="row align-items-center justify-content-center">
				<h2 className="mb-5 text-center text-hero">Nutrition Done The Right Way</h2>
				<picture>
					<source media="(max-width: 767px)" srcSet={`${NutritionSmall} 1x`} />
					<source media="(min-width: 768px)" srcSet={`${NutritionLarge} 1x`} />
					<img src={NutritionLarge} className="img-fluid mx-auto" />
				</picture>
			</div>
		</div>

	)

}