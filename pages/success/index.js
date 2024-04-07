import Link from "next/link";
import {useContext, useEffect} from "react";
import {CartContext} from "@/lib/context/CartContext";

export default function Success() {
    const {clearCart} = useContext(CartContext)

    function deleteCart() {
        clearCart();
    }

    useEffect(() => {
        // Appelez la fonction deleteCart une fois que la composante est montée
        deleteCart();
    }, []);
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center justify-center">
                    <div className="rounded-full bg-green-100 p-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="h-12 w-12 text-green-500"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                </div>
                <div className="text-center mt-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Paiement réussis</h2>
                    <p className="text-gray-600 mt-2 max-w-sm">
                        Votre commande a bien été transmise, elle sera envoyée dans les prochains jours.
                    </p>
                    <Link href="/products"
                          className="block mt-4 text-sm font-medium text-white bg-tennis py-2 px-4 rounded-md hover:bg-tennis/55 focus:outline-none focus:ring"
                    >
                        Continuer de voir les produits
                    </Link>
                </div>
            </div>
        </div>
    );
}