import ProductsCollection from "@/components/ProductsCollection";
import {mongooseConnect} from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function Products({allProducts}){
    return(
        <>
            <div className="mx-auto max-w-screen-xl px-4 py-8 pt-24 sm:px-6 sm:py-12 lg:px-8 mls:w-fit-content">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Tout nos produits</h2>

                    <p className="mx-auto mt-4 max-w-md text-gray-500">
                        Faites vos choix parmi une large gamme de produits indispensables à vos entraînements
                    </p>
                </div>
                <ProductsCollection allProducts={allProducts}/>
            </div>
        </>
    );
}

export async function getServerSideProps() {
    await mongooseConnect();
    const allProducts = await Product.find({}, null, { sort: { _id: 1 } });

    return {
        props: {
            allProducts: JSON.parse(JSON.stringify(allProducts)),
        },
    };
}