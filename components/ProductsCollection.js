import Link from "next/link";
import {CartContext} from "@/lib/context/CartContext";
import {useContext, useState} from "react";

export default function ProductsCollection({allProducts}){
    const { addProduct } = useContext(CartContext)

    const [selectedCategory, setSelectedCategory] = useState('');

    const handleCategorySelect = (event) => {
        setSelectedCategory(event.target.value);
    };

    // Filtrer les produits en fonction de la catégorie sélectionnée
    const filteredProducts = selectedCategory
        ? allProducts.filter(product => product.category === selectedCategory)
        : allProducts;
    function addItemToCart(productId) {
        addProduct(productId);
    }
    return (
        <section>
            <select value={selectedCategory} onChange={handleCategorySelect}>
                <option value="">ko</option>
                <option value="raquette">r</option>
                <option value="balle">b</option>
                <option value="sac">s</option>
                <option value="cordage">c</option>
            </select>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {allProducts?.length > 0 && filteredProducts.map((product) => (
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
                                        data-dashlane-label="true" data-dashlane-rid="4f2810c601fdbcc7" data-form-type="" onClick={() => addItemToCart(product._id)}>Add to
                                        cart
                                    </button>
                                </div>
                            </div>
                        </li>
                    </div>
                ))}
            </ul>
        </section>
    )
}