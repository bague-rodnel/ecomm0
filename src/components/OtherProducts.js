import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NoProductImg from '../images/no-img-product.png';


import Loader from './layout/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productActions';

const OtherProducts = ({productId, keyword, category}) => {
  const dispatch = useDispatch();
  const { loading, products, error, productsCount, resPerPage, filteredCount } = useSelector( state => state.allProducts );

  useEffect(() => {
    // if (a)
      dispatch(getProducts(keyword, 1, [1, 200], category, 0, ''));
  }, [dispatch]);

  return (
    <Fragment>
              
      <div className="lg:col-span-3">
        <div className="bg-white">

          <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">

            <h2 className="h3">Others also viewed:</h2>
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            
              {
                !loading && products.map((product) => {
                  if (product._id !== productId) {
                    return (
                     <Link key={product._id} to={`/products/${product._id}`} className="text-category group">
                      <div className="h-100 flex flex-column justify-content-between">
                       <div className="flex-grow-1 flex w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                          <Link to={`/products/${product._id}`}
                            className="align-self-center"
                           >
                            
                            <img
                              src={product.images[0] && product.images[0].url !== 'x' && product.images[0].url || NoProductImg}
                              alt={product.name}
                              className="w-full object-center object-cover group-hover:opacity-75"
                            />
                           </Link>
                       </div>
                       <div className="align-self-bottom">
                        <h3 className=" mt-4 text-sm text-gray-700">
                          <Link to={`/products/${product._id}`}>{product.name}</Link>
                        </h3>
                         <p className="mt-1 text-lg font-medium text-gray-900">${product.price.toFixed(2)}</p>
                        </div>
                      </div>
                     </Link>
                    )
                  }
                })
              }
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default OtherProducts;