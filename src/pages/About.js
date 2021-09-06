//Base Imports
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


//Bootstrap Components
import {Container} from 'react-bootstrap';



//App Components
import About from './../components/About';
import Feeding from './../components/FeedingContainer';
import Nutrition from './../components/NutritionContainer';

export default function AboutPage(){
	return(
		<>
			<Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
				<About />
				<Feeding />
				<Nutrition />
			</Container>
      	</>
	)
}


