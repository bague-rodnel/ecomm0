//Base Imports
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


//Bootstrap Components
import {Container} from 'react-bootstrap';



//App Components
import Product from './Catalog';



export default function Products(){
	return(
		<>
			<Container fluid>
			  <Product />
			</Container>
      	</>
	)
}


