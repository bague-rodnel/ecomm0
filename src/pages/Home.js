//Base Imports
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


//Bootstrap Components
import {Container} from 'react-bootstrap';



//App Components
import HeroSection from './../components/HeroSection';
import SellDescription from './../components/SellDescription';
import Carousel from './../components/Carousel';
import MailContainer from './../components/MailingContainer';
import ProductShowcase from './../components/ProductShowcase';

export default function Home(){
	return(
		<>
			<Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
				<HeroSection />
			   <SellDescription />
			   <Carousel />
			   <MailContainer />
			   <ProductShowcase />
			</Container>
      	</>
	)
}


