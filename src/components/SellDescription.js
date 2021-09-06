import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';


export default function InfoBlocks(){


	return(
		<>

			<Container fluid>
				<Row className="justify-content-center md:-mb-40 sell-description">
					<Container>
						<Row className="justify-content-center">
							<Col xs={12} md={3} id="protein" className="mx-3 p-3">
								<div className="info-box">
									<h3 className="box-text">HIGH</h3>
									<p className="text-xl box-text2 ">PROTEIN</p>
								</div>
							</Col>
							<Col xs={12} md={3} id="low" className="mx-3 p-3">
								<div className="info-box">
									<h3 className="box-text">LOW</h3>
									<p className="text-xl box-text2 ">CARBS</p>
								</div>
							</Col>
							<Col xs={12} md={3} id="natural" className="mx-3 p-3">
								<div className="info-box">
									<h3 className="box-text">100%</h3>
									<p className="text-xl box-text2 ">NATURAL</p>
								</div>
							</Col>
						</Row>
					</Container>
				</Row>
				<Row className="cus-container py-24 md:pt-56 md:pb-48">
					<Container>
						<Row>
							<Col>
								<p className="text-gray-300 fontSize">Taking care of your pet starts with taking care of what they eat. Zuittzu is dedicated to using only the best quality ingredients, sourced from ethical and sustainable farmers.</p>
								<p className="text-gray-300 fontSize ">With Vita Pet, you can rest easy knowing your bestfriend is eating the best.</p>
							</Col>
						</Row>
					</Container>
				</Row>
			</Container>  

		</>
 
	)
}