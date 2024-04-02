import {useContext, useState} from "react";
import {CartContext} from "@/lib/context/CartContext";
import toast from "react-hot-toast";
import axios from "axios";

export default function Checkout(){
    const {cartProducts} = useContext(CartContext)
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [zip, setZip] = useState('');

    async function stripeCheckout() {
        const response = await axios.post('/api/stripe', {
            email: 'bryanol@hotmail.fr', name: 'tremel', address, country, zip, city, cartProducts
        });

        if (response.data.url) {
            window.location = response.data.url
        } else {
            toast.error('An error occured!!')
        }
    }
    return <>
        <div className="md:1/3 mt-16 md:mt-6">
            <header className="text-center flex flex-col w-full">
                <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Shipping details</h1>
                <p className="mt-2 text-text text-lg">We use your account details for shipping.</p>
            </header>
            <div className="mx-auto max-w-xl p-4 border shadow-xl h-[400px] my-3">
                <div className="space-y-5">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-6">
                            <label className="mb-1 block text-sm font-medium text-text">Email</label>
                            <input type="email" name="email"
                                   className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                                   value="zo"
                                   placeholder='Email'
                            />

                        </div>
                        <div className="col-span-6">
                            <label className="mb-1 block text-sm font-medium text-text">Full Name</label>
                            <input type="text" name="name"
                                   className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                                   value="zo"
                                   placeholder='Full name'
                            />
                        </div>
                        <div className="col-span-12">
                            <label className="mb-1 block text-sm font-medium text-text">Address</label>
                            <input type="text" name="address"
                                   className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                                   placeholder="1864 Main Street"
                                   value={address}
                                   onChange={ev => setAddress(ev.target.value)}
                                   required
                            />

                        </div>
                        <div className="col-span-6">
                            <label className="mb-1 block text-sm font-medium text-text">City</label>
                            <input type="text" name="city"
                                   className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                                   placeholder=""
                                   value={city}
                                   onChange={ev => setCity(ev.target.value)}
                                   required
                            />
                        </div>
                        <div className="col-span-4">
                            <label className="mb-1 block text-sm font-medium text-text">State</label>
                            <input type="text" name="state"
                                   className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                                   placeholder=""
                                   value={country}
                                   onChange={ev => setCountry(ev.target.value)}
                                   required
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="mb-1 block text-sm font-medium text-text">Zip</label>
                            <input type="text" name="zip"
                                   className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                                   placeholder=""
                                   value={zip}
                                   onChange={ev => setZip(ev.target.value)}
                                   required
                            />
                        </div>
                        <div className="col-span-12 text-center w-full">
                            <button
                                onClick={stripeCheckout}
                                className="disabled block rounded bg-secondary px-5 py-3 text-md text-text transition hover:bg-purple-300 w-full"
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