import Link from "next/link";
import { useRouter } from "next/router";
import {useContext, useState} from "react";
import {CartContext} from "@/lib/context/CartContext";
import {signIn, signOut, useSession} from "next-auth/react";

export default function Header() {
    const { data: session } = useSession()
    const router = useRouter()
    const {pathname} = router
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    const {cartProducts} = useContext(CartContext)

    const toggleMobileNav = () => {
        setIsMobileNavOpen(!isMobileNavOpen);
    };

    const active = "text-tennis transition hover:text-tennis/75 p-3 bg-gray-200 rounded-md"
    const inactive = "text-gray-500 transition hover:text-gray-500/75 p-3"


        return (
            <header className="bg-white fixed w-full z-50 border-b-2 sm:relative">
                <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-2 sm:px-6 lg:px-8 sm:px:4">
                    <Link className="block text-tennis" href="/">
                        <span className="sr-only">Accueil</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                             className="h-8">
                            <path
                                d="M21.721 12.752a9.711 9.711 0 0 0-.945-5.003 12.754 12.754 0 0 1-4.339 2.708 18.991 18.991 0 0 1-.214 4.772 17.165 17.165 0 0 0 5.498-2.477ZM14.634 15.55a17.324 17.324 0 0 0 .332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 0 0 .332 4.647 17.385 17.385 0 0 0 5.268 0ZM9.772 17.119a18.963 18.963 0 0 0 4.456 0A17.182 17.182 0 0 1 12 21.724a17.18 17.18 0 0 1-2.228-4.605ZM7.777 15.23a18.87 18.87 0 0 1-.214-4.774 12.753 12.753 0 0 1-4.34-2.708 9.711 9.711 0 0 0-.944 5.004 17.165 17.165 0 0 0 5.498 2.477ZM21.356 14.752a9.765 9.765 0 0 1-7.478 6.817 18.64 18.64 0 0 0 1.988-4.718 18.627 18.627 0 0 0 5.49-2.098ZM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 0 0 1.988 4.718 9.765 9.765 0 0 1-7.478-6.816ZM13.878 2.43a9.755 9.755 0 0 1 6.116 3.986 11.267 11.267 0 0 1-3.746 2.504 18.63 18.63 0 0 0-2.37-6.49ZM12 2.276a17.152 17.152 0 0 1 2.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0 1 12 2.276ZM10.122 2.43a18.629 18.629 0 0 0-2.37 6.49 11.266 11.266 0 0 1-3.746-2.504 9.754 9.754 0 0 1 6.116-3.985Z"/>
                        </svg>
                    </Link>

                    <div className="flex flex-1 items-center justify-end md:justify-between">
                        <nav aria-label="Global" className="hidden md:block">
                            <ul className="flex items-center gap-6 text-sm">
                                <li>
                                    <Link className={pathname === '/' ? active : inactive} href="/"> Accueil </Link>
                                </li>
                                <li>
                                    <Link className={pathname === '/products' ? active : inactive}
                                          href="/products"> Produits </Link>
                                </li>
                            </ul>
                        </nav>

                        <div className="flex items-center gap-1.5 sm:gap-4">
                            {session ? (
                                <button className="h-9 w-9" onClick={() => signOut()}>
                                    <img className="h-full w-full rounded-full object-cover object-center"
                                         src={session.user.image} alt={session.user.email}/>
                                </button>
                            ) : (
                                <button
                                    className="block rounded-md bg-tennis px-2.5 py-2.5 text-sm font-medium text-white transition hover:bg-tennis/55"
                                    onClick={() => signIn('google')}
                                >
                                    Connexion
                                </button>
                            )}

                                <Link
                                    className="block rounded-md bg-gray-100 px-2.5 py-2.5 text-sm font-medium text-tennis transition hover:text-tennis/75 "
                                    href="/cart"
                                >
                                    <div className="flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"/>
                                        </svg>
                                        <span className="ml-2 text-primary font-bold group-hover:text-tennis">{cartProducts.length}</span>
                                    </div>
                                </Link>


                            <div className="block mr-0 md:hidden">
                                <button
                                    onClick={toggleMobileNav}
                                    className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                                >
                                    {isMobileNavOpen ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-tennis"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-tennis"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>

                            {isMobileNavOpen && (
                                <div className="md:hidden absolute top-16 right-0 bg-white border border-zinc-200 rounded shadow-lg p-6 text-lg ">
                                    <nav aria-label="Global">
                                        <ul className="flex flex-col items-start gap-6 text-md">
                                            <li>
                                                <Link className={` ${pathname === '/' ? active : inactive} `} href="/"
                                                      onClick={toggleMobileNav}
                                                >
                                                    Accueil
                                                </Link>
                                            </li>

                                            <li>
                                                <Link className={` ${pathname === '/products' ? active : inactive}`} href="/products"
                                                      onClick={toggleMobileNav}
                                                >
                                                    Produits
                                                </Link>
                                            </li>

                                            <li>
                                                <Link className={` ${pathname === '/cart' ? active : inactive}`} href="/cart"
                                                      onClick={toggleMobileNav}
                                                >
                                                    Panier
                                                </Link>
                                            </li>


                                        </ul>
                                    </nav>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
        );
    }