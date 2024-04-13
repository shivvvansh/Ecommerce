import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoadingBar from "react-top-loading-bar";

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState(0);
  const [total, setTotal] = useState(0);
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });

    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        const trio = JSON.stringify(cart);
        console.log(trio);
        if (trio) {
          let subtro = 0;
          for (let i = 0; i < Object.keys(trio); i++) {
            console.log("hello" + i);
            subtro = subtro + trio.price;
          }
          if (subtro > 0) {
            setTotal(subtro);
          }
          console.log("ndndndnnddsaass" + subtro);
        }
      }
    } catch (error) {
      console.error(error);
      // localStorage.clear()
    }
    const data = localStorage.getItem("EmartToken");
    if (data) {
      setUser({ value: data });
      setKey(Math.floor(Math.random() * 1000));
    }
    //  console.log(data);
  }, [router.query]);

  const logOut = () => {
    localStorage.removeItem("EmartToken");
    // console.log("Logout success fully");
    setKey(Math.random());
    setUser({ value: null });
  };

  const saveCart = (myCart) => {
    try {
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }

    let subt = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    console.log(subt);
    setTotal(subt);
    //  console.log(subt);
  };

  const addToCart = (itemcode, qty, price, name, size, variant, image) => {
    // console.log(image);
    // console.log("add to cart called");
    let newCart = cart;
    if (itemcode in cart) {
      newCart[itemcode].qty = cart[itemcode].qty + qty;
    } else {
      newCart[itemcode] = { qty: 1, price, name, size, variant, image };
    }
    //  console.log(newCart);
    setCart(newCart);
    saveCart(newCart);
  };
  const buyNow = (itemcode, qty, price, name, size, variant, image) => {
    let newCart = { itemcode: { qty: 1, price, name, size, variant, image } };

    //  console.log(newCart);
    setCart(newCart);
    saveCart(newCart);
    router.push("/Checkout");
  };
  const clearCart = () => {
    setCart({});
    saveCart({});
  };
  const removeFromCart = (itemcode, qty, price, name, size, variant, image) => {
    let newCart = cart;
    if (itemcode in cart) {
      newCart[itemcode].qty = cart[itemcode].qty - qty;
    }
    if (newCart[itemcode]["qty"] <= 0) {
      delete newCart[itemcode];
    }
    setCart(newCart);
    saveCart(newCart);
  };
  return (
    <>
      <Navbar
        logOut={logOut}
        user={user}
        cart={cart}
        addToCart={addToCart}
        buyNow={buyNow}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        total={total}
      />
      <LoadingBar
        color="#a78bfa"
        progress={progress}
        height={5}
        background={0}
        loaderSpeed={800}
        waitingTime={800}
        onLoaderFinished={() => setProgress(0)}
      />
      <Component
        user={user}
        cart={cart}
        addToCart={addToCart}
        buyNow={buyNow}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        total={total}
        {...pageProps}
      />
      <Footer />
    </>
  );
}

export default MyApp;
