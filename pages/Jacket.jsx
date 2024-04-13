import React from "react";

// Next js components
import Link from "next/link";
import Head from "next/head";

// Importing Mongoose
import mongoose from "mongoose";

// Model Schema
import Product from "../models/Product";

const Jacket = ({ jacket }) => {
  return (
    <div>
      {/* Page Head And description */}
      <Head>
        <title>Jackets</title>
        <meta
          name="description"
          content="Stay stylish and cozy with our trendy jackets, designed for both fashion-forward individuals and outdoor enthusiasts. Experience ultimate comfort and durability while making a bold fashion statement."
        />
        <link rel="icon" href="/boy.png" />
      </Head>

      {/* Product Section Starts here */}
      <section className="text-gray-600 body-font">
        <div className="container px-6 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {/* Rendering All Jackets from Backend */}
            {Object.keys(jacket).map((p) => {
              return (
                <div
                  key={jacket[p]._id}
                  className="lg:w-1/3 md:w-1/3 p-4 w-full border-x-2 border-gray-200"
                >
                  <Link href={`/product/${jacket[p].slug}`}>
                    <a className="block relative rounded overflow-hidden">
                      <img
                        alt="ecommerce"
                        className="m-auto object-fill h-[30vh] md:h-[36vh] block"
                        src={`${jacket[p].img}`}
                      />
                    </a>
                  </Link>

                  <div className="mt-4 text-center md:text-center m-auto">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      {jacket[p].category}
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {jacket[p].title}
                    </h2>
                    <p className="mt-1">{jacket[p].price}₹</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

// Server side Props
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URL);
  }
  let products = await Product.find({ category: "Jacket" });
  let jacket = {};

  // Different color product
  for (let item of products) {
    if (item.title in jacket) {
      //  ab item . title already tshirt m hoga
      if (
        !jacket[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        // console.log("item.color"+item.color);
        jacket[item.title].color.push(item.color);
      }

      if (
        !jacket[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        // console.log("item.size"+item.size);
        jacket[item.title].size.push(item.size);
      }
    } else {
      jacket[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        jacket[item.title].color = [item.color];

        jacket[item.title].size = [item.size];
      }
    }
  }
  // console.log("these is a jacket array"+ Object.keys(jacket));

  // Parsing And passing Array data Objects
  return {
    props: { jacket: JSON.parse(JSON.stringify(jacket)) }, // will be passed to the page component as props
  };
}

export default Jacket;
