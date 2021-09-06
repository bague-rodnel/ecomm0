
//Base Imports
import React from 'react';
import {Link} from 'react-router-dom';

const PageNotFound = () => {


    return (
        <div className="not-found">
            <div className="row mx-5 h-100 flex align-items-center">
                <div className="col-6">
                    <div className="error-content text-gray-700">                        
                        <h1 className="display-1 mb-3">Woof!</h1>
                        <p className="mb-2">We can't sniff out the page or resource that you're looking for.</p>
                        <p>Let's try again from <Link to="/" style={{ textDecoration: 'underline', color: '#088ABD'}} >Home</Link></p>
                    </div>
                </div>
            </div>
            

        </div>


    )
}

export default PageNotFound;

