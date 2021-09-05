import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline';
import { Button } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'; 
import { addItemToCart, removeItemFromCart, toggleCart } from '../actions/cartActions';
import { Link } from 'react-router-dom';


const products = [
  {
    id: 1,
    name: 'SAMPLE',
    href: '#',
    color: 'SAMPLE',
    price: '20',
    quantity: 1,
    imageSrc: 'https://via.placeholder.com/150.png',
    imageAlt: 'SAMPLE',
  },
  {
     id: 2,
    name: 'SAMPLE',
    href: '#',
    color: 'SAMPLE',
    price: '20',
    quantity: 1,
    imageSrc: 'https://via.placeholder.com/150.png',
    imageAlt: 'SAMPLE',
  },
 
]

export default function Cart({ history }) {
  // const [open, setOpen] = useState(true)

  const dispatch = useDispatch();
  const { cartItems, isOpen = false } = useSelector( state => state.cart );
  const { user } = useSelector( state => state.auth );


  const handleRemoveCartItem = (id) => {
    dispatch(removeItemFromCart(id, user));
  }

  // const handleCheckout = () => {
  //   history.push("/login?redirect=order/shipping");
  // }

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;

    if (newQty <= 0) return;

    dispatch(addItemToCart(id, newQty, user));
  }

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;

    if (newQty > stock) return;

    dispatch(addItemToCart(id, newQty, user));
  }


  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={() => dispatch(toggleCart())}>
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => dispatch(toggleCart())}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                          {cartItems.map((item) => (
                            <li key={item.id} className="py-6 flex">
                              <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-center object-cover"
                                />
                              </div>

                              <div className="ml-4 flex-1 flex flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      <a href={item.href}>{item.name}</a>
                                    </h3>
                                    <div>
                                      <p className="ml-4 small text-right">
                                        ${(item.price).toFixed(2)}
                                      </p>
                                      <p className="ml-4 text-success text-right">
                                        ${(item.price * item.quantity).toFixed(2)}
                                      </p>
                                    </div>
                                  </div>
                                  {/* <p className="mt-1 text-sm text-gray-500">{item.color}</p> */}
                                </div>
                                <div className="flex-1 flex items-end justify-between text-sm">
                                  

                                  <div className="stockCounter d-inline d-flex align-items-center">
                                    <span onClick={() => decreaseQty(item.product, item.quantity)}
                                      className="btn theme--bg text-white p-1 m-0 rounded-0 border-top">
                                      <i className="fa fa-arrow-left"></i>
                                    </span>
                                    <p className="count px-4 text-gray-500">Qty {item.quantity}</p>
                                    <span onClick={() => increaseQty(item.product, item.quantity, item.stock)}
                                      className="btn theme--bg text-white p-1 m-0 rounded-0 border-bottom">
                                      <i className="fa fa-arrow-right"></i>
                                    </span>
                                  </div>


                                  <button type="button" className="font-medium text-blue-600 hover:text-blue-500"
                                    onClick={() => handleRemoveCartItem(item.product)}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p className="text-success">${cartItems.reduce((acc, item) => (acc + item.quantity * item.price), 0).toFixed(2)}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                   
                      <Link to={`/order/shipping`}
                        onClick={(e) => {
                          if (!cartItems || !cartItems.length) {
                            return e.preventDefault();
                          }
                          dispatch(toggleCart());
                        }}
                         
                        className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 w-100"
                      >
                       Checkout
                      </Link>
                      


                    </div>
                    <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                      <p>
                        or{' '}
                        <button
                          type="button"
                          className="text-blue-600 font-medium hover:text-blue-500"
                          onClick={() => dispatch(toggleCart())}
                        >
                          Continue Shopping<span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                    <div className="mt-6 flex justify-center text-sm">
                      <Link to={`/cart`}>
                        <span className="small text-gray-400">cart page view</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}