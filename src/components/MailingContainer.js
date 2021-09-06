import React from 'react';

import DryKit from './../images/dry-kit-chicken-herring.png';

export default function MailContainer(){



	return(

		<div className="container-fluid cus-container py-5">
			<div className="row align-items-center justify-content-center">
				<div className="col-md-4 col-12">
					<form className="py-32 cus-padding-form" action="">
						<p className="form-text1 text-center mb-3">Join Our Mailing List to Get the Latest News and Promotions</p>
						<div className="rounded-md -space-y-px">
						<div className="py-3 px-10">
							<label htmlFor="first-name" className="sr-only">
							First Name
							</label>
							<input
							id="first-name"
							type="text"
							required
							className="appearance-none rounded-none w-full block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg"
							placeholder="First Name"
							/>
						</div>
						<div className="py-3 px-10">
							<label htmlFor="last-name" className="sr-only">
							Last Name
							</label>
							<input
							id="last-name"
							type="text"
							required
							className="appearance-none rounded-none w-full block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg"
							placeholder="Last Name"
							/>
						</div>
						</div>
						<div className="py-3 px-10">
						<label htmlFor="email-address" className="sr-only">
							Email address
						</label>
						<input
							id="email-address"
							type="email"
							autoComplete="email"
							required
							className="appearance-none rounded-none w-full block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg"
							placeholder="Email address"
						/>
						</div>

						<div className="pt-5 px-10 rounded-md text-center">

							<a
							href="#"
								className="cuz-button inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-black hover:bg-blue-500 "
								>
								JOIN NOW
							</a>
							
					</div>
					</form>
				</div>
				<div className="col-md-4 col-12">
					<img src={DryKit} alt="" className="img-fluid" />
				</div>
			</div>
		</div>
	)
}