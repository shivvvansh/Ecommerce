import React from "react";

const HomeExtractor2 = () => {
  return (
    <div>
        {/* Home Component 2 */}
      <section className="py-12 bg-white sm:py-16 lg:py-20">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-md mx-auto text-center">
            {/* Page Title */}
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Our featured items
            </h2>
            {/* Some Attractive Catchy Line */}
            <p className="mt-4 text-base font-normal leading-7 text-gray-600">
              Unlock the world of endless shopping possibilities with our
              irresistible ecommerce wonderland
            </p>
          </div>

          {/* Item Container  */}
          <div className="grid grid-cols-4 gap-6 mt-50 lg:mt-16 lg:gap-4 lg:grid-cols-3 item-center ">
            {/* Item 1 */}
            <div className="relative group">
              <div className="overflow-hidden aspect-w-1 aspect-h-1">
                <img
                  className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
                  src="https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80"
                  alt=""
                  style={{ height: "430px" }}
                />
              </div>
              <div className="flex items-start justify-between mt-4 space-x-4">
                <div>
                  <h3 className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                    <a href="#" title="">
                      Amazing Jackets
                      <span
                        className="absolute inset-0"
                        aria-hidden="true"
                      ></span>
                    </a>
                  </h3>
                </div>

                <div className="text-right">
                  <p className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                    Starting from ₹499 only
                  </p>
                </div>
              </div>
            </div>
            {/* Item 2 */}
            <div className="relative group my-16 mx-10">
              <div className="overflow-hidden aspect-w-1 aspect-h-1">
                <img
                  className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
                  src="https://images.unsplash.com/photo-1609873814058-a8928924184a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                  alt=""
                  style={{ height: "430px" }}
                />
              </div>
              <div className="absolute left-3 top-3">
                <p className="sm:px-3 sm:py-1.5 px-1.5 py-1 text-[8px] sm:text-xs font-bold tracking-wide text-white uppercase bg-gray-900 rounded-full">
                  Sale
                </p>
              </div>
              <div className="flex items-start justify-between mt-4 space-x-4">
                <div>
                  <h3 className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                    <a href="#" title="">
                      Hoodie
                      <span
                        className="absolute inset-0"
                        aria-hidden="true"
                      ></span>
                    </a>
                  </h3>
                </div>

                <div className="text-right">
                  <p className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                    Strating from ₹299 only
                  </p>
                  {/* <del className="mt-0.5 text-xs sm:text-sm font-bold text-gray-500"> 299 </del> */}
                </div>
              </div>
            </div>
            {/* Item 3 */}
            <div className="relative group">
              <div className="overflow-hidden aspect-w-1 aspect-h-1 ">
                <img
                  className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
                  src="https://images.unsplash.com/photo-1597576000003-2e6487e67d20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                  alt=""
                  style={{ height: "430px" }}
                />
              </div>
              <div className="flex items-start justify-between mt-4 space-x-4">
                <div>
                  <h3 className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                    <a href="#" title="">
                      T-shirts
                      <span
                        className="absolute inset-0"
                        aria-hidden="true"
                      ></span>
                    </a>
                  </h3>
                </div>

                <div className="text-right">
                  <p className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                    Strating at ₹322 only
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeExtractor2;
