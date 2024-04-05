import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react"
import {CartContextProvider} from "@/lib/context/CartContext";
import {Toaster} from "react-hot-toast";
import { GoogleAnalytics } from '@next/third-parties/google'
import CookieBanner from "@/components/CookieBanner";
import {cleanLocalStorageOnUnload} from "@/lib/storageConsent";
import {useEffect} from "react";



const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps: { session, ...pageProps } }) {

  useEffect(() => {
    cleanLocalStorageOnUnload('cookie_consent');
  }, []);

  return <>
    <SessionProvider session={session}>
      <CartContextProvider>
        <main className={`${inter}`}>
          <Header/>
          <Toaster position='top-center' />
          <Component {...pageProps}/>
          <GoogleAnalytics gaId="G-T80XDD5K20"/>
          <Footer/>
          <CookieBanner/>
        </main>
      </CartContextProvider>
    </SessionProvider>
</>

}