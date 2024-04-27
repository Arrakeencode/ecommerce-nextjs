import { CartContext } from "@/lib/context/CartContext";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useContext } from "react";
import toast from "react-hot-toast";

export default function ProductPage({ product }) {
    const { addProduct } = useContext(CartContext)
    if (product) {
        return (
            <section className="mx-auto max-w-screen-xl px-4 py-8 pt-24 sm:px-6 sm:py-12 lg:px-8">
                <div className="block sm:flex">
                    <div className="block w-full sm:flex sm:w-3/5 sm:flex-wrap sm:items-center">
                    {product.images.map((image, index) => (
                        <div key={index} className="lg:aspect-h-2 lg:aspect-w-2 lg:rounded-lg overflow-hidden md:px-2 md:py-2 sm:w-1/2">
                            <img
                                src={image}
                                alt={image}
                                className="w-full h-2/4 mb-4 sm:mb-0 object-contain border rounded-lg"
                            />
                        </div>
                    ))}
                    </div>

                    {/* Product info */}
                    <div className="p-4 lg:p-8 w-full sm:w-2/5 rounded-lg border">
                        <h1 className="text-3xl font-semibold text-gray-900">{product.title}</h1>
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold text-gray-900">Description</h2>
                            <p className="mt-2 text-gray-700">{product.description}</p>
                        </div>

                        <div className="mt-6">
                            <h2 className="text-xl font-semibold text-gray-900">Categorie</h2>
                            <p className="mt-2 text-gray-700 list-disc list-inside">
                                {product?.category}
                            </p>
                        </div>

                        <div className="mt-4 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-900">Prix</h2>
                            <p className="mt-2 font-semibold text-lg">
                                {product.price} €
                            </p>
                        </div>
                        <div className="w-full">
                            <button
                                className="bg-tennis text-white py-2 px-4 mt-4 rounded-md hover:bg-tennis/55 w-full"
                                onClick={() => {addProduct(product._id);
                                    toast.success('Produit ajouté au panier')}}
                            >
                                Ajouter au panier
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return <p>Product not found.</p>;
}


export async function getServerSideProps(context) {
    await mongooseConnect();
    const { id } = context.query;
    const product = await Product.findById(id);
    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
        },
    };
}