import Link from "next/link";
import {useContext} from "react";
import {CartContext} from "@/lib/context/CartContext";

export default function NewProducts({newProducts}){
    const { addProduct } = useContext(CartContext)

    return (
        <section>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {newProducts?.length > 0 && newProducts.map((product) => (
                    <div key={product.id}>
                        <li>
                            <div className="group block overflow-hidden">
                                <div className="relative md:h-[300px] h-[200px]">
                                    <img
                                        src={product.images[0]}
                                        alt=""
                                        className="absolute inset-0 h-full w-full object-contain opacity-100 group-hover:opacity-0"
                                    />
                                    <img
                                        src={product.images[1]}
                                        alt=""
                                        className="absolute inset-0 h-full w-full object-contain opacity-0 group-hover:opacity-100"
                                    />
                                </div>
                                <div className="relative bg-white pt-3">
                                    <Link href={'/products/' + product._id}>
                                        <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                                            {product.title}
                                        </h3>
                                    </Link>

                                    <p className="mt-2">
                                        <span className="sr-only"> Regular Price </span>

                                        <span className="tracking-wider text-gray-900"> {product.price} €</span>
                                    </p>
                                </div>
                                <div className="col-span-12 text-center w-full mt-3">
                                    <button
                                        className="disabled block rounded bg-secondary px-5 py-3 text-md text-text w-full transition hover:bg-purple-300"
                                        data-dashlane-label="true" data-dashlane-rid="4f2810c601fdbcc7"
                                        data-form-type="" onClick={() => addProduct(product._id)}>Add to
                                        cart
                                    </button>
                                </div>
                            </div>
                        </li>
                    </div>
                ))}
            </ul>
            ))}
        </section>
    )
}