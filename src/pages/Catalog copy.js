import React, { Fragment, useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import MetaData from '../components/layout/MetaData';
import Product from '../components/product/Product';
import Loader from '../components/layout/Loader';

import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { getProducts } from '../actions/productActions';

const { createSliderWithTooltip  } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = ({ match }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0);
  const [sliderChanged, setSliderChanged] = useState(false);
  const [filter, setFilter] = useState('');

  const categories = [
    "Cats",
    "Dogs"
  ];

  const lifeStages = [
    "Adult",
    "Puppy",
    "Kitten"
  ];

  const foodTypes = [
    "Dry",
    "Wet"
  ];

  const flavors = [
    "Chicken",
    "Lamb",
    "Salmon",
    "Herring",
    "Tuna",
    "Mixed",
    "Beef",
    "Turkey"
  ]

  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, products, error, productsCount, resPerPage, filteredCount } = useSelector( state => state.allProducts );
  const keyword = match.params.keyword;

  useEffect(() => {
    setSliderChanged(false);
    if (error) {
      return alert.error(error);
    }

    console.log('fetching products with filters: ')
    console.log('keyword: ',keyword)
    console.log('price: ',price)
    console.log('category: ',category)
    console.log('rating: ',rating)
    console.log('filter: ',filter)
    dispatch(getProducts(keyword, currentPage, price, category, rating, filter));

  }, [dispatch, alert, error, keyword, currentPage, category, rating, filter, sliderChanged])

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  const count = keyword ? filteredCount : productsCount;

  return (
    <Fragment>
      <div className="container container-fluid">
      { loading ? <Loader /> : (
        <Fragment>
          <MetaData title={'Buy Best Products Online'} />
          
          <h1 id="products_heading">Latest Products</h1>

          <section id="products" className="container mt-5">
            <div className="row">
                {/* ( keyword || category || rating || filter || (price > 1 && price < 1000 ))
                ? ( */}
                  <div className="col-6 col-md-3 mt-5 mb-5">
                    <div className="px-5">
                      <Range 
                        marks={{ 1 : `$1`, 1000 : `$1000`}}
                        min={1}
                        max={1000}
                        defaultValue={[1, 1000]}
                        tipFormatter={value => `$${value}`}
                        tipProps={{
                          placement: "top",
                          visible: true
                        }}
                        value={price}
                        onChange={price => setPrice(price)}
                        onAfterChange={() => setSliderChanged(true)}
                      />

                      <hr className="mt-5" />

                      <div className="mt-3">
                        <h4 className="mb-2 filters">
                          Categories
                        </h4>
                        <ul className="pl-0">
                          {categories.map( category => (
                            <li 
                              key={category} 
                              style={{ 
                                cursor: 'pointer',
                                listStyleType: 'none'
                              }} 
                              onClick={() => setCategory(category)}
                            >
                             {category}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <hr className="my-3" />
                      
                      <div className="mt-3">
                        <h4 className="mb-2 filters">
                          Life Stage
                        </h4>
                        <ul className="pl-0">
                          {lifeStages.map( filter => (
                            <li 
                              key={filter} 
                              style={{ 
                                cursor: 'pointer',
                                listStyleType: 'none'
                              }} 
                              onClick={() => setFilter(filter)}
                            >
                             {filter}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <hr className="my-3" />

                      <div className="mt-3">
                        <h4 className="mb-2 filters">
                          Food Type
                        </h4>
                        <ul className="pl-0">
                          {foodTypes.map( filter => (
                            <li 
                              key={filter} 
                              style={{ 
                                cursor: 'pointer',
                                listStyleType: 'none'
                              }} 
                              onClick={() => setFilter(filter)}
                            >
                             {filter}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <hr className="my-3" />

                      <div className="mt-3">
                        <h4 className="mb-2 filters">
                          Flavors
                        </h4>
                        <ul className="pl-0">
                          {flavors.map( filter => (
                            <li 
                              key={filter} 
                              style={{ 
                                cursor: 'pointer',
                                listStyleType: 'none'
                              }} 
                              onClick={() => setFilter(filter)}
                            >
                             {filter}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <hr className="my-3" />

                      <div className="mt-3">
                        <h4 className="mb-3">
                          Rating
                        </h4>
                        <ul className="pl-0">
                          {[5,4,3,2,1].map( star => (
                            <li 
                              key={star} 
                              style={{ 
                                cursor: 'pointer',
                                listStyleType: 'none'
                              }} 
                              onClick={() => setRating(star)}
                            >
                             <div className="rating-outer">
                               <div className="rating-inner"
                                    style={{ 
                                      width: `${star * 20}%`,
                                    }}
                                >
                               </div>
                             </div>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>
                  </div>

                  <div className="col-6 col-md-9">
                    <div className="row">
                      {
                        products && products.map(product => ( 
                          <Product key={product.id} product={product} col={4} />
                        ))
                      }
                    </div>
                  </div>
                
            </div>  
          </section> 

          { count > resPerPage && (
            <div className="d-flex justify-content-center mt-5">
            <Pagination
              activePage={ currentPage }
              itemsCountPerPage={ resPerPage }
              totalItemsCount={ productsCount }
              onChange={ setCurrentPageNo }
              nextPageText={'Next'}
              prevPageText={'Prev'}
              firstPageText={'First'}
              lastPageText={'Last'}
              itemClass="page-item"
              linkClass="page-link"
            />
          </div>
          )}
          
        </Fragment>
        )
      }
      </div>
    </Fragment>
  )
}



const productsx = [
  {
    id: 1,
    name: 'SAMPLE',
    href: '#',
    price: '$48',
    imageSrc: 'https://via.placeholder.com/150.png',
    imageAlt: 'SAMPLE',
  },
  {
    id: 2,
    name: 'SAMPLE',
    href: '#',
    price: '$48',
    imageSrc: 'https://via.placeholder.com/150.png',
    imageAlt: 'SAMPLE',
  },
  {
    id: 3,
    name: 'SAMPLE',
    href: '#',
    price: '$48',
    imageSrc: 'https://via.placeholder.com/150.png',
    imageAlt: 'SAMPLE',
  },
  {
    id: 4,
    name: 'SAMPLE',
    href: '#',
    price: '$48',
    imageSrc: 'https://via.placeholder.com/150.png',
    imageAlt: 'SAMPLE',
  },
   {
    id: 5,
    name: 'SAMPLE',
    href: '#',
    price: '$48',
    imageSrc: 'https://via.placeholder.com/150.png',
    imageAlt: 'SAMPLE',
  },

   {
    id: 6,
    name: 'SAMPLE',
    href: '#',
    price: '$48',
    imageSrc: 'https://via.placeholder.com/150.png',
    imageAlt: 'SAMPLE',
  },

  {
    id: 7,
    name: 'SAMPLE',
    href: '#',
    price: '$48',
    imageSrc: 'https://via.placeholder.com/150.png',
    imageAlt: 'SAMPLE',
  },

  {
    id: 8,
    name: 'SAMPLE',
    href: '#',
    price: '$48',
    imageSrc: 'https://via.placeholder.com/150.png',
    imageAlt: 'SAMPLE',
  },
]

export default Home
