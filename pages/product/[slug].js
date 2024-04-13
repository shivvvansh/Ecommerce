import { useRouter } from "next/router";
import { useState } from "react";
import mongoose from "mongoose";
import Product from "../../models/Product";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
// import { redirect } from "next";
// import '../api/pincode'
const Post = ({addToCart,buyNow,product,varients}) => {
  // console.log(varients);
  // console.log(product);
  const router = useRouter();
  const { slug } = router.query;
  const [pin, setPin] = useState()
  const [service, setService] = useState()
   const [color, setColor] = useState(product.color)
   const [size, setSize] = useState(product.size)
   //  console.log(varients);
   const onChangePin =(e)=>{
     // e.preventDefault();
     setPin(e.target.value)
    }
    const refreshVarients =(newsize,newcolor)=>{
      let url = `${process.env.NEXT_PUBLIC_HOST}product/${varients[newcolor][newsize]['slug']}`
      window.location = url;
      // redirect({`/product/${varients[newcolor][newsize]['slug']}`})
      // router.push(`/product/${varients[newcolor][newsize]['slug']}`)
    }
          
      //     <ToastContainer
      // position="top-center"
      // autoClose={5000}
      // hideProgressBar={false}
      // newestOnTop={false}
      // closeOnClick
      // rtl={false}
      // pauseOnFocusLoss
      // draggable
      // pauseOnHover
      // />

    // icon 
    const checkserviceAbility = async()=>{
      const res = await fetch('../api/pincode')
      let pinjson = await res.json()
      if (pinjson.includes(parseInt(pin))) {
          setService(true)
          toast.success('Yey ,Your pincode is not serviceable!', {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }
        else{
            setService(false)
            toast.error('Sorry ,Your pincode is not serviceable !', {
              position: "bottom-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
        }
    }
    
  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
/>
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="m-auto h-[30vh] md:h-[60vh] block"
              src={`${product.img}`}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                BRAND NAME
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
               {product.title}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor" 
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p className="leading-relaxed">
               {product.desc}
              </p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color - {color}</span>
                 
                  
                       
                         {Object.keys(varients).includes("Orange")&& Object.keys(varients['Orange']).includes(size) && <button  onClick={()=>{refreshVarients(size,'Orange')}}  className={`border-2 bg-orange-600 rounded-full w-6 h-6 focus:outline-none ${color === "Orange"? 'border-black': 'border-gray-400'}`}></button>}

                         {Object.keys(varients).includes("Black")&& Object.keys(varients['Black']).includes(size) && <button  onClick={()=>{refreshVarients(size,'Black')}}  className={`border-2 bg-black rounded-full w-6 h-6 focus:outline-none ${color === "Black"? 'border-black': 'border-gray-400'}`}></button>}

                         {Object.keys(varients).includes("White")&& Object.keys(varients['White']).includes(size) && <button  onClick={()=>{refreshVarients(size,'White')}}  className={`border-2 bg-white rounded-full w-6 h-6 focus:outline-none border-gray-400 ${color === 'White'? 'border-black': 'border-gray-400'}`}></button>}

                         {Object.keys(varients).includes("Pink")&& Object.keys(varients['Pink']).includes(size) && <button  onClick={()=>{refreshVarients(size,'Pink')}}  className={`border-2 bg-pink-400 rounded-full w-6 h-6 focus:outline-none ${color === 'Pink' ? 'border-black': 'border-gray-400'}`}></button>}

                         {Object.keys(varients).includes("Yellow")&& Object.keys(varients['Yellow']).includes("Yellow") && <button  onClick={()=>{refreshVarients(size,'Yellow')}}  className={`border-2 bg-yellow-600 rounded-full w-6 h-6 focus:outline-none ${color === 'Yellow'? 'border-black': 'border-gray-400'}`}></button>}

                         {Object.keys(varients).includes("Brown")&& Object.keys(varients['Brown']).includes("Brown") && <button  onClick={()=>{refreshVarients(size,'Brown')}}  className={`border-2 bg-red-900 rounded-full w-6 h-6 focus:outline-none ${color === 'Brown'? 'border-black': 'border-gray-400'}`}></button>}

                         {Object.keys(varients).includes("Aqua")&& Object.keys(varients['Aqua']).includes(size) && <button  onClick={()=>{refreshVarients(size,'Aqua')}}  className={`border-2 bg-blue-600 rounded-full w-6 h-6 focus:outline-none ${color === "Aqua"? 'border-black': 'border-gray-400'}`}></button>}

                         {Object.keys(varients).includes("Gray")&& Object.keys(varients['Gray']).includes(size) && <button  onClick={()=>{refreshVarients(size,'Gray')}}  className={`border-2 bg-gray-600 rounded-full w-6 h-6 focus:outline-none ${color === "Gray"? 'border-black': 'border-gray-400'}`}></button>}

                         {Object.keys(varients).includes("Purple")&& Object.keys(varients['Purple']).includes(size) && <button  onClick={()=>{refreshVarients(size,'Purple')}}  className={`border-2 bg-purple-600 rounded-full w-6 h-6 focus:outline-none ${color === "Purple"? 'border-black': 'border-gray-400'}`}></button>}

                         {Object.keys(varients).includes("Green")&& Object.keys(varients['Green']).includes(size) && <button  onClick={()=>{refreshVarients(size,'Green')}}  className={`border-2 bg-green-600 rounded-full w-6 h-6 focus:outline-none ${color === "Green"? 'border-black': 'border-gray-400'}`}></button>}

                         
                      
                    
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select value={size} onChange={(e)=>{refreshVarients(e.target.value,color)}} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                    {Object.keys(varients[color]).includes("S") && <option value={'S'}>S</option>}
                    {Object.keys(varients[color]).includes("M") && <option value={'M'}>M</option>}
                      {Object.keys(varients[color]).includes("L") && <option value={'L'}>L</option>}
                      {Object.keys(varients[color]).includes("XL") && <option value={'XL'}>XL</option>}
                      {Object.keys(varients[color]).includes("XXL") && <option value={'XXL'}>XXL</option>}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap">
                <span className="title-font font-medium text-2xl md:ml-2 ml-9 text-gray-900">
                  ${product.price}
                </span>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-10 md:ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
                {/* k,1,cart[k].price,cart[k].name,cart[k].size,cart[k].varient */}
                <button onClick={()=>{addToCart(slug,1,product.price,product.title,size,color,product.img)}} className="flex ml-7 md:ml-10 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                  Add to cart
                </button>
                <button onClick={()=>{buyNow(slug,1,product.price,product.title,size,color,product.img)}} className="flex md:ml-10 ml-1 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                  Buy now
                </button>
              </div>
          {/* <div className="flex my-5">
              <input onChange={onChangePin} type="text" className="border-2 border-gray-400 py-2 px-6 text-sm" placeholder="Check your pin code  "/>
          <button onClick={checkserviceAbility} className="flex ml-2 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                pincode
                </button>
          </div> */}
          {/* {(!service && service != null) && <div className="text-red-600">Sorry, We do not deliver to this address</div>}
          {(service && service != null) && <div className="text-green-600">Yey we're deliverable to this address</div>} */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URL)
}
  let product = await Product.findOne({slug: context.query.slug})
  // console.log("THESE IS A PRODUCT TITLE"+product.title);
  let varients = await Product.find({title: product.title})
  let colorSizeSlug = {}
  for(let item of varients){
    if(Object.keys(colorSizeSlug).includes(item.color)){
      colorSizeSlug[item.color][item.size] = {slug:item.slug}
    }
    else{
      colorSizeSlug[item.color] = {} 
      colorSizeSlug[item.color][item.size] = {slug:item.slug}
     
    }
  }
  return {
    props: {product: JSON.parse(JSON.stringify(product)),varients: JSON.parse(JSON.stringify(colorSizeSlug))}, // will be passed to the page component as props
  }
}
export default Post;
