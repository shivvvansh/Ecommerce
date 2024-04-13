// </div>
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkout = ({ cart, addToCart, removeFromCart, total }) => {
  const [Subtotal, setSubtotal] = useState(0);
  const [email, setEmail] = useState();
  const [firstName, setfirstName] = useState();
  const [lastName, setlastName] = useState();
  const [Address, setAddress] = useState();
  const [state, setstate] = useState();
  const [Region, setRegion] = useState();
  const [contactNumber, setcontactNumber] = useState();
  const [pincode, setpincode] = useState();
  const [truepin, settruepin] = useState(false);
  const [city, setcity] = useState();
  const [Block, setBlock] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (!cart) {
      router.push(`${process.env.NEXT_PUBLIC_HOST}`);
      toast.error("Your Cart is empty", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, []);

  let t = 0;
  const Datahandler = async (e) => {
    // console.log(e.target.value);
    if (e.target.name == "first") {
      setfirstName(e.target.value);
      // console.log(firstName);
    } else if (e.target.name == "last") {
      setlastName(e.target.value);
      // console.log(lastName);
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
      // console.log(Address);
    } else if (e.target.name == "state") {
      setstate(e.target.value);
      // console.log(state);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
      // console.log(email);
    } else if (e.target.name == "region") {
      setRegion(e.target.value);
      // console.log(country);
    } else if (e.target.name == "phone") {
      setcontactNumber(e.target.value);
      // console.log(phone);
    } else if (e.target.name == "pincode") {
      setpincode(e.target.value);
      // console.log(pincode);
    } else if (e.target.city == "city") {
      setcity(e.target.value);
      // console.log(city);
    }
  };
  const finder = async () => {
    if (pincode.length == 6) {
      const res = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`,
        {
          method: "GET",
          header: {
            "content-type": "application/json",
          },
        }
      );
      const json = await res.json();
      console.log(json);
      if (json[0].Status == "Success") {
        toast.success("Your Pin code is valid", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // console.log("hello");
        const district = json[0].PostOffice[0].District;
        // console.log("my district is :" + district);
        setcity(`${district}`);
        document.getElementById("city").value = district;
        const circle = json[0].PostOffice[0].Circle;
        // console.log("my state is :" + circle);
        setstate(circle);
        document.getElementById("state").value = circle;
        const arr = [];
        for (let i = 0; i < json[0].PostOffice.length; i++) {
          // console.log(json[0].PostOffice[i].Name);
          arr[i] = json[0].PostOffice[i].Name;
        }
        setBlock(arr);
        // console.log("my block is"+Block);
      } else {
        toast.warning("Your Pin code is not valid", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };
initiatePayment = async () => {
    if (
      firstName &&
      lastName &&
      Address &&
      contactNumber &&
      pincode &&
      city &&
      state
    ) {
      // console.log("all details are filled");
      toast.success("Redirecting to payment gateway", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      const Order_id = Math.floor(Math.random() + Date.now());
      let txnToken;
      let amount = total;
      let data = {
        amount,
        Order_id,
        email: "email",
        firstName,
        lastName,
        Address,
        contactNumber,
        pincode,
        city,
        state,
        cart,
      };
      const res = await fetch(`http://localhost:3000/api/proTransaction`, {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let token = await res.json();
      const tok = token.body.txnToken;
      // console.log("my token is " + token.body.txnToken);
      var config = {
        root: "",
        flow: "DEFAULT",
        data: {
          orderId: Order_id /* update order id */,
          token: tok /* update token value */,
          tokenType: "TXN_TOKEN",
          amount: amount /* update amount */,
        },
        handler: {
          notifyMerchant: function (eventName, data) {
            console.log("notifyMerchant handler function called");
            console.log("eventName => ", eventName);
            console.log("data => ", data);
          },
        },
      };

      // initialze configuration using init method
      window.Paytm.CheckoutJS.init(config)
        .then(function onSuccess() {
          // after successfully updating configuration, invoke JS Checkout
          window.Paytm.CheckoutJS.invoke();
        })
        .catch(function onError(error) {
          console.log("error => ", error);
        });
    } else {
      // console.log("error spot");
      toast.warning("Please fill all the mandatory details", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // console.log(total);
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <Script
        type="application/javascript"
        crossorigin="anonymous"
        src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MERCHANT_ID}.js`}
      />
      {/* htmlFor autoComplete fillRule clipRule defaultChecked*/}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <main className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto lg:max-w-none">
          <h1 className="sr-only">Checkout</h1>

          <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
            <div>
              <div className="mt-3 border-t border-gray-200 pt-2">
                <h2 className="text-lg font-medium text-center text-gray-900">
                  Shipping information
                </h2>

                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div>
                    <label
                      htmlFor="first"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        onChange={(e) => {
                          Datahandler(e);
                        }}
                        id="first"
                        name="first"
                        // autoComplete="given-name"
                        className="block w-full border-2 border-gray-400 p-1 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="last"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="last"
                        name="last"
                        onChange={(e) => {
                          Datahandler(e);
                        }}
                        // autoComplete="family-name"
                        className="block w-full p-1 shadow-sm border-2 border-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

               
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="address"
                        id="address"
                        onChange={(e) => {
                          Datahandler(e);
                        }}
                        // autoComplete="street-address"
                        className="block w-full border-2 border-gray-400 p-1 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="pincode"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Pincode
                    </label>
                    <div className="mt-1 flex">
                      <input
                        type="text"
                        name="pincode"
                        id="pincode"
                        onChange={(e) => {
                          Datahandler(e);
                        }}
                        // autoComplete="postal-code"
                        className="block w-2/3 border-2 border-gray-400 p-1 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <button
                        onClick={finder}
                        className="first-letter:border-2 rounded border-gray-400 px-2 py-1 focus:ring-indigo-500 font-small bg-indigo-500 hover:bg-indigo-700 text-white focus:border-indigo-500 ml-2"
                      >
                        Check
                      </button>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="city"
                        id="city"
                        onChange={(e) => {
                          Datahandler(e);
                        }}
                        // autoComplete="address-level2"
                        className="block w-full border-2 border-gray-400 p-1 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="region"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Region
                    </label>
                    <div className="mt-1">
                      <select
                        id="region"
                        name="region"
                        onChange={(e) => {
                          Datahandler(e);
                        }}
                        // autoComplete="country-name"
                        className="block w-full border-2 border-gray-400 p-1 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        {Block.map((e) => {
                          return (
                            <>
                              {" "}
                              key={e}
                              <option
                                id="region"
                                name="region"
                                onChange={(e) => {
                                  Datahandler(e);
                                }}
                              >
                                {e}
                              </option>
                            </>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700"
                    >
                      State
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="state"
                        id="state"
                        onChange={(e) => {
                          Datahandler(e);
                        }}
                        // autoComplete="address-level1"
                        className="block w-full border-2 border-gray-400 p-1 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        onChange={(e) => {
                          Datahandler(e);
                        }}
                        // autoComplete="tel"
                        className="block w-full border-2 border-gray-400 p-1 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Order summary --> */}
            <div className="mt-10 lg:mt-0">
              <h2 className="text-lg font-medium text-gray-900">
                Order summary
              </h2>

              <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h3 className="sr-only">Items in your cart</h3>
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {Object.keys(cart).map((k) => {
                    return (
                      <div key={k}>
                        <li className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
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
                                  onClick={() => {
                                    addToCart(
                                      k,
                                      1,
                                      cart[k].price,
                                      cart[k].name,
                                      cart[k].size,
                                      cart[k].varient
                                    );
                                    {
                                      t = t + cart[k].price;
                                    }
                                    setSubtotal(cart[k].price);
                                  }}
                                  type="button"
                                  className="font-medium text-indigo-600 hover:text-indigo-500 mx-2"
                                >
                                  Add
                                </button>
                                <button
                                  onClick={() => {
                                    removeFromCart(
                                      k,
                                      1,
                                      cart[k].price,
                                      cart[k].name,
                                      cart[k].size,
                                      cart[k].varient
                                    );
                                  }}
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
                    );
                  })}
                </ul>
                <dl className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      ₹{total}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Shipping</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      ₹40.00
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Taxes</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      ₹{(total * 3) / 100}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                    <dt className="text-base font-medium">Total</dt>
                    <dd className="text-base font-medium text-gray-900">
                      ₹{total + 40 + (total * 3) / 100}
                    </dd>
                  </div>
                </dl>

                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                  <Link href={"#"}>
                    <button
                      onClick={initiatePayment}
                      className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                    >
                      Confirm order
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Checkout;
