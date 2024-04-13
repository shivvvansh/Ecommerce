import React from "react";

const HomeExtractor = () => {
  return (
    <div>
      {/* Home Component 1 */}
      <section>
        <div className="relative py-12 bg-gray-900 sm:py-16 lg:py-20 xl:pt-32 xl:pb-44">
          <div className="absolute inset-0 hidden lg:block">
            {/* Page Image  */}
            <img
              className="object-cover object-right-bottom w-full h-full"
              src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/hero/1/background.png"
              alt=""
            />
          </div>

          <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-xl mx-auto text-center lg:max-w-md xl:max-w-lg lg:text-left lg:mx-0">
              {/* Page Title */}
              <h1 className="text-3xl font-bold text-white sm:text-4xl xl:text-5xl xl:leading-tight">
                Ecommerce Store
              </h1>
              {/* Page Short desc */}
              <p className="mt-8 text-base font-normal leading-7 text-gray-400 lg:max-w-md xl:pr-0 lg:pr-16">
                Powerful ecommerce store platform, designed for seamless online
                shopping experiences. Discover a vast selection of products,
                enjoy secure transactions, and benefit from exceptional customer
                support
              </p>

              {/* Button Design */}
              <div className="flex items-center justify-center mt-8 space-x-5 xl:mt-16 lg:justify-start">
                <a
                  href="#"
                  title="Buy Clothes"
                  className="
                            inline-flex
                            items-center
                            justify-center
                            px-3
                            py-3
                            text-base
                            font-bold
                            leading-7
                            text-gray-900
                            transition-all
                            duration-200
                            bg-white
                            border border-transparent
                            rounded-md
                            sm:px-6
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white
                            hover:bg-gray-200
                        "
                  role="button"
                >
                  Buy Clothes
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 lg:hidden">
            <img
              className="object-cover w-full h-full"
              src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/hero/1/bg.png"
              alt=""
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeExtractor;
