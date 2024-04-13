import Link from 'next/link'
import React from 'react'

// mongoose
import mongoose from "mongoose";
import Product from '../models/Product';


const Tshirts = ({tshirts}) => {
  // console.log(products);
  return (
    <div>
        <section className="text-gray-600 body-font">
  <div className="container px-6 py-24 mx-auto">
    <div className="flex flex-wrap -m-4">

    
      {Object.keys(tshirts).map((p)=>{ 
     return <div key={tshirts[p]._id} className="lg:w-1/3 md:w-1/3 p-4 w-full border-x-2 border-gray-200">
        <Link href={`/product/${tshirts[p].slug}`}>
        <a className="block relative rounded overflow-hidden">
          <img alt="ecommerce" className="m-auto object-fill h-[30vh] md:h-[36vh] block" src={`${tshirts[p].img}`}/>
        </a>
        </Link>
        
        <div className="mt-4 text-center md:text-center m-auto">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{tshirts[p].category}</h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">{tshirts[p].title}</h2>
          <p className="mt-1">${tshirts[p].price}</p>
        </div>
      </div>})}
    
    </div>
  </div>
</section>
    </div>
  )
}
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URL)
}
  let products = await Product.find({category:'Tshirt'})
  let tshirts = {}
  for(let item of products) {
         if(item.title in tshirts){
        if(!tshirts[item.title].color.includes(item.color) && item.availableQty>0){
          tshirts[item.title].color.push(item.color)
        }

        if(!tshirts[item.title].size.includes(item.size) && item.availableQty>0){
          tshirts[item.title].size.push(item.size)
        }

        }
        else{
           tshirts[item.title] = JSON.parse(JSON.stringify(item))
           if (item.availableQty > 0) {
            tshirts[item.title].color = [item.color]
            tshirts[item.title].size = [item.size]
           }

         }
    
  }
// console.log("these is a tshirts array"+ Object.keys(tshirts));
  return {
    props: {tshirts: JSON.parse(JSON.stringify(tshirts))}, // will be passed to the page component as props
  }
}
export default Tshirts