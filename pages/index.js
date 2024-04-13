// Next Js Components
import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";

// Importing Stype Sheet
// import styles from '../styles/Home.module.css'

// Importing Both Component
import HomeExtractor from './Home/HomeExtractor';
import HomeExtractor2 from './Home/HomeExtractor2';

export default function Home() {
  return (
    <div>
      {/* Header */}
      <Head>
        <title>Shoppers-Stop</title>
        <meta name="description" content="Revolutionize your online shopping experience with our cutting-edge ecommerce store | Discover a vast selection of products, unbeatable deals, and exceptional customer service | Secure transactions and fast shipping guaranteed" />
        <link rel="icon" href="/boy.png" />
      </Head>
      <HomeExtractor/>
      <HomeExtractor2/>
    
     
    </div>
  )
}
