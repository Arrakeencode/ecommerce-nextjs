import "@/styles/globals.css";

import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {CartContextProvider} from "@/lib/context/CartContext";
import {Toaster} from "react-hot-toast";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return <>
    <CartContextProvider>
      <main className={`${inter}`}>
        <SpeedInsights/>
        <Header/>
        <Toaster position='top-center' />
        <Component {...pageProps}/>
        <Footer/>
      </main>
    </CartContextProvider>
</>
}