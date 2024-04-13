// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "../../models/Product"
import connectDB from "../../middleware/mongoose"

// Getting All Products
 const handler=async(req, res)=> {
    let products = await Product.find()
    let tshirts = {}
    for (let item of products) {
           if(item.title in tshirts){
          // console.log(item.title);
          if(!tshirts[item.title].color.includes(item.color) && item.availabltQty > 0){
            tshirts[item.title].color.push(item.color)
          }

          if(!tshirts[item.title].size.includes(item.size) && item.availabltQty > 0){
            tshirts[item.title].size.push(item.size)
          }

          }
          else{

             tshirts[item.title] = JSON.parse(JSON.stringify(item))
             if (item.availabltQty > 0) {
              tshirts[item.title].color = [item.color]
              tshirts[item.title].size = [item.size]
 
             }

           }
      
    }
    // console.log("tshirts are"+tshirts);
    res.status(200).json({ tshirts })
  }
  export default connectDB(handler)
  