import { Fragment, useState, useEffect } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { ChevronDownIcon, FilterIcon, MinusSmIcon, PlusSmIcon, ViewGridIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom';

//Product data
import Loader from '../components/layout/Loader';

import Pagination from 'react-js-pagination';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productActions';

import NoProductImg from '../images/no-img-product.png';

const { createSliderWithTooltip  } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const subCategories = [
  { name: 'Cats', href: '#' },
  { name: 'Dogs', href: '#' }
]

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: true },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]

const filters = [
  {
    id: 'lifeStage',
    name: 'Life Stage',
    options: [
      { value: 'adult', name: 'Adult', checked: false },
      { value: 'puppy', name: 'Puppy', checked: false },
      { value: 'kitten',name: 'Kitten', checked: true }
    ],
  },
  {
    id: 'foodType',
    name: 'Food Type',
    options: [
      { value: 'dry', name: 'Dry', checked: false },
      { value: 'wet', name: 'Wet', checked: false }
    ],
  },
  {
    id: 'flavors',
    name: 'Flavors',
    options: [
      { value: 'chicken', name: 'Chicken', checked: false },
      { value: 'lamb', name: 'Lamb', checked: false },
      { value: 'salmon', name: 'Salmon', checked: false },
      { value: 'herring', name: 'Herring', checked: false },
      { value: 'tuna', name: 'Tuna', checked: false },
      { value: 'mixed', name: 'Mixed', checked: false },
      { value: 'turkey', name: 'Turkey', checked: false },
      { value: 'beef', name: 'Beef', checked: false },
    ],
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Catalog({ ignoreTerm, history, match }) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 200]);
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0);
  const [sliderChanged, setSliderChanged] = useState(false);
  const [filter, setFilter] = useState('');
  const [ignoreKeyword, setIgnoreKeyword] = useState(ignoreTerm);

  const dispatch = useDispatch();
  const { loading, products, error, productsCount, resPerPage, filteredCount } = useSelector( state => state.allProducts );

  const  keyword =  match && match.params.keyword;
  console.log('keyword: ', keyword);
  console.log('ignoreKeyword: ', ignoreKeyword);



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
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                <div className="px-4 flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>




                {/* Filters */}
               <form className="mt-4 border-t border-gray-200">


                 <h3 className="sr-only">Categories</h3>
                 <ul role="list" className="font-medium text-gray-900 px-2 py-3">
                   {subCategories.map((sub) => (
                     <li key={sub.name}>
                       <a href={sub.href} 
                          className="text-category text-2xl text-gray-900  block px-2 py-3"
                          onClick={() => setCategory(sub.name)}>
                         {sub.name}
                       </a>
                     </li>
                   ))}
                   <li key="reset">
                    <a href="#"
                      className="text-category text-sm text-gray-400  block px-3 py-3"
                      onClick={() => setCategory('')}>
                      Show all
                    </a>
                   </li>
                 </ul>



                 {filters.map((section) => (
                   <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                     {({ open }) => (
                       <>
                         <h3 className="-mx-2 -my-3 flow-root">
                           <Disclosure.Button className=" px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                             <span className="font-medium text-gray-900">{section.name}</span>
                             <span className=" ml-6 flex items-center">
                               {open ? (
                                 <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                               ) : (
                                 <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                               )}
                             </span>
                           </Disclosure.Button>
                         </h3>
                         <Disclosure.Panel className="pt-6">
                           <div className="space-y-6">
                             {section.options.map((option, optionIdx) => (
                               <div key={option.value} className="flex items-center"
                                  onClick={()=>{setFilter(option.name.toLowerCase())}}
                               >
                                 <label
                                   htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                   className="ml-3 min-w-0 flex-1 text-gray-500"
                                    style={{ cursor: 'pointer' }}
                                 >
                                   {option.name}
                                 </label>
                               </div>
                             ))}
                           </div>
                         </Disclosure.Panel>
                       </>
                     )}
                   </Disclosure>
                 ))}


                <div className="my-5 px-5 ">
                  <Range 

                    marks={{ 1 : `$1`, 200 : `$200`}}
                    min={1}
                    max={200}
                    defaultValue={[1, 200]}
                    tipFormatter={value => `$${value}`}
                    tipProps={{
                      placement: "top",
                      visible: true
                    }}
                    value={price}
                    onChange={price => setPrice(price)}
                    onAfterChange={() => setSliderChanged(true)}
                  />
                </div>
               </form>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>

        <main className=" px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Products</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-md text-category'
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button type="button" className="p-2 -m-2 ml-5 sm:ml-7 text-gray-400 hover:text-gray-500">
                <span className="sr-only">View grid</span>
                <ViewGridIcon className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FilterIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24" >
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            
           

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
              {/* Filters */}
              <div className="sticky-top align-self-start">
              
              

                <form className="hidden lg:block">
                  

                  <h3 className="sr-only">Categories</h3>
                  <ul role="list" className="text-xl font-medium text-gray-900 space-y-4 pb-6 border-b border-gray-200">
                    {subCategories.map((category) => (
                      <li 
                        key={category.name}
                        onClick={() => setCategory(category.name)}
                      >
                        <a className="text-category text-gray-900" href={category.href}>{category.name}</a>
                      </li>
                    ))}
                    <li key="reset">
                      <a href="#"
                        className="text-category text-sm text-gray-400"
                        onClick={() => setCategory('')}>
                       Show all
                      </a>
                    </li>
                  </ul>

                  {filters.map((section) => (
                    <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-lg text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">{section.name}</span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                  <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              {section.options.map((option, optionIdx) => (
                                <div key={option.value} className="flex items-center"
                                  onClick={()=>{setFilter(option.name.toLowerCase())}}
                                >
                  
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3 text-md text-gray-600"
                                    style={{ cursor: 'pointer' }}
                                  >
                                    {option.name}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}

                  <div className="my-5 px-3">
                    <Range 
                      marks={{ 1 : `$1`, 200 : `$200`}}
                      min={1}
                      max={200}
                      defaultValue={[1, 200]}
                      tipFormatter={value => `$${value}`}
                      tipProps={{
                        placement: "top",
                        visible: true
                      }}
                      value={price}
                      onChange={price => setPrice(price)}
                      onAfterChange={() => setSliderChanged(true)}
                    />
                  </div>
                </form>
              </div>

              {/* Product grid */}
              
              <div className="lg:col-span-3">
                {/* Replace with your content */}
           		  <div className="bg-white">
           		       <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
           		         <h2 className="sr-only">Products</h2>

           		        
                      { keyword && 
                        <p className="mb-3">Matching keyword: <em>"{keyword}"</em><Link to="/products" className="ml-3 text-danger">reset</Link></p>
                      }

                      { loading ? <Loader /> :
           		         <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                         {
                            products && products.map((product) => (
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
           		           ))}
           		         </div>
                      }
           		       </div>
           		  </div>		
                {/* /End replace */}

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
              </div>
              
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}