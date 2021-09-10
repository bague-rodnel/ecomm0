import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {  Nav } from 'react-bootstrap'

import Loader from '../components/layout/Loader';
import MetaData from '../components/layout/MetaData';

import NoAvatar from '../images/no-img-avatar.png';


const Profile = () => {

  const { user, loading } = useSelector(state => state.auth);

  return (
    <Fragment>
      { loading ? <Loader /> : (
        <Fragment>

          <div className="mt-10 sm:mt-0 my-5"> 
          <h3 className="pl-5 text-xl font-medium leading-6 text-gray-900">My Profile</h3>
           <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                  <div className="px-4 pt-5 sm:px-0">
                      <div className="container">
                          <div className="flex row justify-content-center">
                                <div className="col-12 col-md-6 d-flex flex-column">
                                  <span className="flex justify-center h-auto w-auto rounded-full overflow-hidden">
                                      <img className="rounded-circle img-fluid" 
                                        src={user.avatar.url !== 'x' && user.avatar.url || NoAvatar} 
                                         />
                                  </span>
                                  <Link to="/me/update" id="edit_profile" className="py-3 flex justify-center">
                                    <button
                                     type="submit"
                                     className="cus-login-register py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                     >
                                          Edit Profile
                                     </button>
                                  </Link>

                                  
                                  
                                </div>
                          </div>
                        
                      </div>
                  </div>
                
              </div>

              <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="shadow overflow-hidden sm:rounded-md">
                      <div className="px-4 py-5 bg-white sm:p-6">
                         <div className="flex flex-row grid grid-cols-6 gap-6">
                           <div className="col-span-6 sm:col-span-3">
                              <label htmlFor="first-name" className="block text-lg font-medium text-gray-700">
                               First Name
                             </label>
                             <input
                               type="text"
                               name="first-name"
                               id="first-name"
                               className="uppercase mt-1 focus:ring-indigo-500 focus:border-indigo-500 block  w-full h-10 shadow-md sm:text-sm border-gray-500 rounded-md"
                               value={user.firstName}
                             />
                           </div>
                            <div className="col-span-6 sm:col-span-3">
                              <label htmlFor="last-name" className="block text-lg font-medium text-gray-700">
                               Last Name
                             </label>
                             <input
                               type="text"
                               name="last-name"
                               id="last-name"
                               className="uppercase mt-1 focus:ring-indigo-500 focus:border-indigo-500 block  w-full h-10 shadow-md sm:text-sm border-gray-500 rounded-md"
                               value={user.lastName}
                             />
                           </div>

                            <div className="col-span-6 sm:col-span-3">
                              <label htmlFor="full-name" className="block text-lg font-medium text-gray-700">
                               Email Address
                             </label>
                               <input
                                 type="email"
                                 name="email-address"
                                 id="email-address"
                                 className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block  w-full h-10 shadow-md sm:text-sm border-gray-500 rounded-md"
                                 value={user.email}
                               />
                           </div>
                           
                              <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="joined" className="block text-lg font-medium text-gray-700">
                                 Joined
                               </label>
                               <input
                                 type="text"
                                 name="joined"
                                 id="joined"
                                 className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block  w-full h-10 shadow-md sm:text-sm border-gray-500 rounded-md"
                                 value={ String(user.createdAt).substring(0, 10) }
                               />
                             </div>

                         </div>
                        
                         <div className="text-right py-5 sm:px-6">
                            {
                              !user.isAdmin &&(
                               <Link to="/orders/me">  

                                   <button
                                   type="submit"
                                   className="cus-login-register inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                   >
                                       My Orders
                                   </button>

                               </Link> 
                         
                     
                           )}

                           <Link to="/password/update" >  

                               <button
                               type="submit"
                               className=" cus-login-register inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                               >
                                   Change Password
                               </button>

                           </Link> 
                        </div>

                      </div>
                  </div>
              </div>

           </div>
          </div>
          
        </Fragment>
      )}
    </Fragment>
  )
}

export default Profile
