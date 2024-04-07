import Link from "next/link";
import {CartContext} from "@/lib/context/CartContext";
import {useContext, useState} from "react";

export default function ProductsCollection({allProducts}){
    const { addProduct } = useContext(CartContext)
    const [selectedCategory, setSelectedCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 4;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    const handleCategorySelect = (event) => {
        setSelectedCategory(event.target.value);
        setCurrentPage(1); // Reset page number when category changes
    };

    // Filtrer les produits en fonction de la catégorie sélectionnée
    const filteredProducts = selectedCategory
        ? allProducts.filter(product => product.category === selectedCategory)
        : allProducts;

    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    function addItemToCart(productId) {
        addProduct(productId);
    }

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <section>
            <label className="mb-1 block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500">Categorie</label>
            <select className="block w-full rounded-md border-red-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" value={selectedCategory} onChange={handleCategorySelect}>
                <option value="">Tout les produits</option>
                <option value="raquette">Raquette</option>
                <option value="balle">Balle de tennis</option>
                <option value="sac">Sac</option>
                <option value="cordage">Cordage</option>
            </select>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {allProducts?.length > 0 && currentProducts.map((product) => (
                    <div key={product.id}>
                        <li>
                            <div className="group block overflow-hidden">
                                <div className="relative md:h-[250px] h-[200px]">
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
                                <div className="relative bg-white pt-2">
                                    <Link href={'/products/' + product._id}>
                                        <h3 className="text-base text-gray-700 hover:underline">
                                            {product.title}
                                        </h3>
                                    </Link>

                                    <p className="mt-2">
                                        <span className="sr-only"> Regular Price </span>

                                        <span className="text-sm tracking-wider text-gray-900"> {product.price} €</span>
                                    </p>
                                </div>
                                <div className="col-span-12 text-center w-full mt-3">
                                    <button
                                        className="disabled block rounded bg-tennis px-5 py-3 text-md text-text w-full transition hover:bg-tennis/55"
                                        data-dashlane-label="true" data-dashlane-rid="4f2810c601fdbcc7"
                                        data-form-type="" onClick={() => addItemToCart(product._id)}>Add to
                                        cart
                                    </button>
                                </div>
                            </div>
                        </li>
                    </div>
                ))}
            </ul>
            <div className="flex justify-center mt-8">
                {Array.from({length: totalPages}, (_, i) => (
                    <button
                        key={i}
                        className={`mx-2 px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-gray-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                        onClick={() => handlePageChange(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </section>
    )
}