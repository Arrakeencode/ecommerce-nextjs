import {useContext, useState} from "react";
import {CartContext} from "@/lib/context/CartContext";
import toast from "react-hot-toast";
import axios from "axios";
import {signIn, useSession} from "next-auth/react";

export default function Checkout(){
    const { data: session } = useSession()
    const {cartProducts} = useContext(CartContext)
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [zip, setZip] = useState('');

    async function stripeCheckout() {
        const response = await axios.post('/api/stripe', {
            email: session.user.email, name: session.user.name, address, country, zip, city, cartProducts
        });

        if (response.data.url) {
            window.location = response.data.url
        } else {
            toast.error('An error occured!!')
        }
    }
    if (session) {
        return <>
            <div className="mx-auto max-w-screen-xl px-4 py-8 pt-24 sm:px-6 sm:py-12 lg:px-8">
                <header className="text-center flex flex-col w-full">
                    <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Détails de livraison</h1>
                    <p className="mt-2 text-text text-lg">Nous utilisons vos coordonnées de compte pour la livraison</p>
                </header>
                <div className="mx-auto max-w-xl p-4 border shadow-xl h-[400px] my-3">
                    <div className="space-y-5">
                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-6">
                                <label className="mb-1 block text-sm font-medium text-text">Email</label>
                                <input type="email" name="email"
                                       className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                                       value={session.user.email}
                                       placeholder='Email'
                                />

                            </div>
                            <div className="col-span-6">
                                <label className="mb-1 block text-sm font-medium text-text">Nom complet</label>
                                <input type="text" name="name"
                                       className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                                       value={session.user.name}
                                       placeholder='Full name'
                                />
                            </div>
                            <div className="col-span-12">
                                <label className="mb-1 block text-sm font-medium text-text">Addresse</label>
                                <input type="text" name="address"
                                       className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                                       placeholder="120 rue Jule"
                                       value={address}
                                       onChange={ev => setAddress(ev.target.value)}
                                       required
                                />

                            </div>
                            <div className="col-span-6">
                                <label className="mb-1 block text-sm font-medium text-text">Ville</label>
                                <input type="text" name="city"
                                       className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                                       placeholder="Paris"
                                       value={city}
                                       onChange={ev => setCity(ev.target.value)}
                                       required
                                />
                            </div>
                            <div className="col-span-4">
                                <label className="mb-1 block text-sm font-medium text-text">Pays</label>
                                <input type="text" name="country"
                                       className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                                       placeholder="France"
                                       value={country}
                                       onChange={ev => setCountry(ev.target.value)}
                                       required
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="mb-1 block text-sm font-medium text-text">Zip</label>
                                <input type="text" name="zip"
                                       className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                                       placeholder="75001"
                                       value={zip}
                                       onChange={ev => setZip(ev.target.value)}
                                       required
                                />
                            </div>
                            <div className="col-span-12 text-center w-full">
                                <button
                                    onClick={stripeCheckout}
                                    className="disabled block rounded bg-tennis px-5 py-3 text-md text-white transition hover:bg-tennis/55 w-full"
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    }
    return <>
        <div className="grid h-screen px-4 bg-white place-content-center">
            <div className="text-center">

                <p className="mt-4 text-text text-2xl">Vous devez vous connecter pour procéder au paiement</p>

                <button
                    onClick={() => signIn('google')}
                    className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-tennis rounded hover:bg-tennis/55 focus:outline-none focus:ring"
                >
                    Se connecter
                </button>
            </div>
        </div>
    </>
}