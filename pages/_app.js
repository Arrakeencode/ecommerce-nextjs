import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react"
import {CartContextProvider} from "@/lib/context/CartContext";
import {Toaster} from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return <>
    <SessionProvider session={session}>
      <CartContextProvider>
        <main className={`${inter}`}>
          <Header/>
          <Toaster position='top-center' />
          <Component {...pageProps}/>
          <Footer/>
        </main>
      </CartContextProvider>
    </SessionProvider>
</>
}