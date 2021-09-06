// import {withRouter} from 'react-router-dom';
// import {CardElement} from '@stripe/react-stripe-js';
// import { useAlert } from 'react-alert';
// import axios from 'axios';
// import Swal from 'sweetalert2';


// const Card = ({ history }) => {
// 	const swal = withReactContent(Swal);
//   const alert = useAlert();
//   const stripe = useStripe();
//   const elements = useElements();
  
// 	const handleSubmit = async (e) => {
// 		e.preventDefault();

// 		// create payment intent on the server
// 		const token = await store.getState().auth.token;

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       }
//     }

//     // res = await axios.post(`${API}/api/payments/process`, paymentData, config);
//     // res = await axios.post(`http://localhost:4000/api/payments/process`, paymentData, config);
//     res = await axios.post(`https://csp3-ecommercev2.herokuapp.com/api/payments/process`, paymentData, config);

//     // const stripe = require('stripe')("STRIPE_SECRET");


// 		// module.exports.processPayment = async( req, res) => {
// 		//   const paymentIntent = await stripe.paymentIntents.create({
// 		//     amount: req.body.amount,
// 		//     currency: 'usd',
// 		//     metadata: { integration_check: 'accept_a_payment' }
// 		//   })

// 		//   res.status( 200 ).json({
// 		//     success: true,
// 		//     client_secret: paymentIntent.client_secret  
// 		//   })
// 		// }



// 		// confirm the payment on the client;
// 	}


    

// 	return (
// 		<>
// 			<h1>Card</h1>

// 			<form id="payment-form" onSubmit={handleSubmit}>
// 				<label htmlFor="card-element">Card</label>
// 				<CardElement id="card-element" />

// 				<button>Pay</button>
// 			</form>
// 		</>
// 	)
// }