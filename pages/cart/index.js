import {useContext, useEffect, useState} from "react";
import {CartContext} from "@/lib/context/CartContext";
import axios from "axios";
import Link from "next/link";

export default function Cart(){
    const { cartProducts, removeProduct, addProduct, clearCart } = useContext(CartContext);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        console.log(cartProducts)
        if (cartProducts.length > 0) {
            axios.post('/api/cart', { ids: cartProducts })
                .then(response => {
                    console.log(response.data); // Ajoutez cette ligne pour afficher les produits dans la console
                    setProducts(response.data);

                })
        } else {
            setProducts([]);
        }
    }, [cartProducts]);

    function increaseProduct(id) {
        addProduct(id);
    }

    function decreaseProduct(id) {
        removeProduct(id);
    }

    function deleteCart(id) {
        clearCart();
    }

    let total = 0;
    for (const productId of cartProducts) {
        const price = products.find(p => p._id === productId)?.price || 0;
        total += price;
    }

    return (
    <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="mx-auto max-w-3xl">
                <header className="text-center">
                    <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Your Cart</h1>
                </header>

                <div className="mt-8">
                    <ul className="space-y-4">
                        {products?.length > 0 && products.map((product) => (
                            <div key={product._id} className="mt-8">
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-4 justify-between">
                                        <img
                                            src={product.images[0]}
                                            alt=""
                                            className="h-16  rounded object-cover"
                                        />

                                        <div>
                                            <h3 className="text-md text-text max-w-md">{product.title}</h3>

                                            <dl className="mt-0.5 space-y-px text-[10px] text-text">
                                                <p className="text-center">{product.price} €</p>
                                            </dl>
                                        </div>

                                        <div>
                                            <label htmlFor="Quantity" className="sr-only"> Quantity </label>

                                            <div className="flex items-center gap-1">
                                                <button
                                                    type="button"
                                                    className="w-10 h-10 leading-10 text-text transition hover:opacity-75 border "
                                                    onClick={() => decreaseProduct(product._id)}
                                                >
                                                    -
                                                </button>

                                                <input
                                                    type="number"
                                                    id="Quantity"
                                                    value={cartProducts.filter(id => id === product._id).length}
                                                    className="h-10 w-16 rounded border border-secondary text-primary font-bold text-center [-moz-appearance:_textfield] sm:text-md [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"


                                                />

                                                <button
                                                    type="button"
                                                    className="w-10 h-10 leading-10 text-text transition hover:opacity-75 border"
                                                    onClick={() => increaseProduct(product._id)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                </ul>


                            </div>
                        ))}
                        <div className="flex justify-end text-red-400  mb-3">
                            <button onClick={deleteCart}>Clear Cart</button>

                        </div>
                    </ul>

                    <div className="mt-6 flex justify-end border-t border-gray-100 pt-6">
                        <div className="w-screen max-w-lg space-y-4">
                        <dl className="space-y-0.5 text-md text-gray-700">
                                <div className="flex justify-between !text-base font-medium">
                                    <dt>Total ({cartProducts.length} articles)</dt>
                                    <dd>{total} €</dd>

                                </div>
                            </dl>
                            <div className="flex justify-end">
                                <Link
                                    href="/checkout"
                                    className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                                >
                                    Checkout
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}