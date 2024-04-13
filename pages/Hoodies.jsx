import React from "react";
// Next Link
import Link from "next/link";
// Mongoose 
import mongoose from "mongoose";
import Product from "../models/Product";

const Hoodies = ({ hoodies }) => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-6 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {Object.keys(hoodies).map((p) => {
              return (
                <div
                  key={hoodies[p]._id}
                  className="lg:w-1/3 md:w-1/3 p-4 w-full border-x-2 border-gray-200"
                >
                  <Link href={`/product/${hoodies[p].slug}`}>
                    <a className="block relative rounded overflow-hidden">
                      <img
                        alt="ecommerce"
                        className="m-auto object-fill h-[30vh] md:h-[36vh] block"
                        src={`${hoodies[p].img}`}
                      />
                    </a>
                  </Link>

                  <div className="mt-4 text-center md:text-center m-auto">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      {hoodies[p].category}
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {hoodies[p].title}
                    </h2>
                    <p className="mt-1">${hoodies[p].price}</p>
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
// Server side props
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URL);
  }
  let products = await Product.find({ category: "Hoodies" });
  let hoodies = {};
  for (let item of products) {
    if (item.title in hoodies) {
      if (
        !hoodies[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        hoodies[item.title].color.push(item.color);
      }

      if (
        !hoodies[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        hoodies[item.title].size.push(item.size);
      }
    } else {
      hoodies[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        hoodies[item.title].color = [item.color];
        hoodies[item.title].size = [item.size];
      }
    }
  }
  // console.log("these is a hoodies array"+ Object.keys(hoodies));
  return {
    props: { hoodies: JSON.parse(JSON.stringify(hoodies)) }, // will be passed to the page component as props
  };
}

export default Hoodies;
