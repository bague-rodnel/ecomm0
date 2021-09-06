import React from 'react';

import NutritionLarge from './../images/Nutrition_graphic.jpg';
import NutritionSmall from './../images/Nutrition_graphic_sm.jpg';



export default function Nutrition(){


	return(

		<div className="container py-5">
			<div className="row align-items-center justify-content-center">
				<h2 className="mb-5 text-center text-hero">Nutrition Done The Right Way</h2>
				<picture>
					<source srcSet={`${NutritionSmall} 1x`} media="(max-width: 480px)" />
					<img
						className="img-fluid mx-auto"
						srcSet={`${NutritionSmall} 1x, ${NutritionLarge} 2x`}
						alt="Nutrition Done The Right Way" />
				</picture>
			</div>
		</div>

	)

}