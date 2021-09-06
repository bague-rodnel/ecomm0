import React from 'react';

import NutritionLarge from './../images/Nutrition_Infographic.png';
import NutritionSmall from './../images/Nutrition_Infographic_small.png';

export default function Nutrition(){


	return(

		<div className="container-fluid py-5 row align-items-center justify-content-center">
		
			 <img src={NutritionLarge} alt="" id="nutritionLarge" />
	     
			 <img src={NutritionSmall} alt="" id="nutritionSmall"/>
		</div>

	)

}