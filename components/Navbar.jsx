import React,{ useRef,useEffect } from "react";
import Link from "next/link";
import {AiOutlineShoppingCart} from "react-icons/ai";
import {FaTshirt} from "react-icons/fa";
import {GiHoodie,GiSleevelessJacket} from "react-icons/gi";
import {FiShoppingCart} from "react-icons/fi";
import {VscAccount} from "react-icons/vsc";
import { useState } from "react";

// AiOutlineShoppingCart icon
const Navbar = ({logOut,user,cart,addToCart,removeFromCart,clearCart,total}) => {
  const [dropDown, setDropDown] = useState(false)
  const mousetoggler =()=>{
     setDropDown(!dropDown)
  }
  const toggler = () => {
    if (ref.current.classList.contains("block")) {
      ref.current.classList.remove("block");
      ref.current.classList.add("hidden");
    } else if (ref.current.classList.contains("hidden")) {
      ref.current.classList.remove("hidden");
      ref.current.classList.add("block");
    }
  };
  const ref = useRef();
  return (
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap md:p-5 py-5 flex-col md:flex-row md:items-center">
          <a className="flex title-font font-medium items-left text-gray-900 mb-3 md:mb-0">
            <span className="md:ml-3 ml-1 text-xl flex">Shoppers Stop<FiShoppingCart className="m-1"/></span>
          </a>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <Link href="/">
              <a className="mr-5 hover:text-gray-900">Home</a>
            </Link>
            <Link href="/Tshirts">
              <a className="mr-5 hover:text-gray-900 flex">t-shirt <FaTshirt className="text-lg m-1"/></a>
            </Link>
            <Link href="/Jacket">
              <a className="mr-5 hover:text-gray-900 flex"> Jacket 🧥</a>
            </Link>
            <Link href="/Hoodies">
              <a className="mr-5 hover:text-gray-900 flex">Hoodies <GiHoodie className="text-lg mt-1 text-black"/></a>
            </Link>
            {/* <Link href="/Contact">
              <a className="mr-5 hover:text-gray-900">Contact</a>
            </Link> */}
            {/* <Link href="/Login">
              <a className="mr-5 hover:text-gray-900">Login</a>
            </Link> */}
          </nav>
           
         <div className="md:relative absolute flex md:top-auto md:right-auto right-2 top-4">
    <button className="inline-flex items-center bg-gray-100 border-0 py-1 ml-2 focus:outline-none hover:bg-gray-300 rounded text-base md:mt-0">
    <AiOutlineShoppingCart onClick={toggler} className="text-2xl" />
    </button>
    
    {!user.value && <Link href="/Login"><button className="flex items-center justify-center rounded-md border border-transparent bg-indigo-500 px-2 py-0 ml-2 text-md font-small text-white shadow-sm hover:bg-indigo-600">Login</button></Link>}
          
     {user.value && <div onMouseEnter={mousetoggler} onMouseLeave={mousetoggler}>
     <button className="inline-flex items-center bg-gray-100 border-0 py-1 ml-3 focus:outline-none hover:bg-gray-300 rounded text-base md:mt-0"><VscAccount className="text-2xl" /></button> 

    {dropDown && <div className="absolute md:top-0 md:right-30 right-0 md:mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
    <div className="py-1" role="none">
      <Link href={'/'}><a className="text-gray-600 block px-4 py-2 text-sm hover:text-black" role="menuitem" tabIndex="-1" id="menu-item-0">Account settings</a></Link>

      <Link href={'/'}><a className="text-gray-600 block px-4 py-2 text-sm hover:text-black" role="menuitem" tabIndex="-1" id="menu-item-1">Orders</a></Link>

      <Link href={'/'}><a className="text-gray-600 block px-4 py-2 text-sm hover:text-black" role="menuitem" tabIndex="-1" id="menu-item-2">License</a></Link>

        <button onClick={logOut} className="text-gray-600 block w-full text-left px-4 py-2 text-sm hover:text-black" role="menuitem" tabIndex="-1" id="menu-item-3">LogOut </button>
    </div>
  </div>}
      </div>}
      </div>
             
          
        </div>
      </header>
      {/* transform transition-transform translate-x-full  aria-labelledby="slide-over-title" role="dialog" aria-modal="true"*/}
      <div>
        <div className="absolute z-50 top-0 left-0">
          {/* <div className="fixed inset-0 bg-gray-500 bg-opacity- transition-opacity"></div> */}

          <div ref={ref} className="fixed inset-0 overflow-hidden hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <div className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <h2
                          className="text-lg font-medium text-gray-900"
                          id="slide-over-title"
                        >
                          Shopping cart
                        </h2>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            onClick={toggler}
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500 outline-none"
                          >
                            <span className="sr-only">Close panel</span>
                            <svg
                              className="h-6 w-6"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                       {Object.keys(cart).length == 0 && <h1 className="font-large">no item in cart</h1>}
                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                          {Object.keys(cart).map((k)=>{
                           return <div key={k}>
                                <li className="flex py-6">
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                {/* {console.log("imgae is "+ cart[k].image)} */}
                                <img
                                  src={`${cart[k].image}`}
                                  alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                     
                                      <a> {cart[k].name}</a>
                                     
                                    </h3>
                                    <p className="ml-4">₹{cart[k].price}</p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">
                                    Salmon
                                  </p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <p className="text-gray-500">Qty {cart[k].qty}</p>

                                  <div className="flex">
                                    <button
                                    onClick={()=>{addToCart(k,1,cart[k].price,cart[k].name,cart[k].size,cart[k].varient)}}
                                      type="button"
                                      className="font-medium text-indigo-600 hover:text-indigo-500 mx-2"
                                    >
                                      Add
                                    </button>
                                    <button
                                    onClick={()=>{removeFromCart(k,1,cart[k].price,cart[k].name,cart[k].size,cart[k].varient)}}
                                      type="button"
                                      className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                           </div>

                          })}
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/*https://images.unsplash.com/photo-1622290319146-7b63df48a635?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1072&q=80  */}

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>₹{total}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-3">
                        
                      <Link href={'/Checkout'} onClick={toggler}>
                      <a
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-small text-white shadow-sm hover:bg-indigo-700"
                          >
                          Checkout
                        </a>
                      </Link>
                        
                      </div>
                      <div className="mt-3" onClick={clearCart}>
                        
                        <a
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-small text-white shadow-sm hover:bg-indigo-700"
                          >
                          Clear Cart
                        </a>
                        
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                        
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
