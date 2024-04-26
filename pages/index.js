import {mongooseConnect} from "@/lib/mongoose";
import { Product } from "@/models/Product";
import NewProducts from "@/components/NewProducts";

export default function Home({newProducts}) {
  return (

          <div className="mx-auto max-w-screen-xl px-4 py-8 pt-24 sm:px-6 sm:py-12 lg:px-8 mls:w-fit-content">
              <div className="text-center">
                <h1 className="text-xl font-bold my-4 text-gray-900 sm:text-4xl">Bienvenue sur votre magasin de tennis</h1>
                <p>Découvrez une sélection complète d&apos;équipements de qualité pour tous les niveaux, des raquettes aux accessoires. Notre équipe de passionnés est là pour vous conseiller. Parcourez notre magasin dès maintenant pour vivre pleinement votre passion pour le tennis !</p>
                  <h2 className="text-xl font-bold my-4 text-gray-900 sm:text-3xl">Nos derniers produits</h2>
                  <p className="mx-auto mt-4 max-w-md text-gray-500">
                      Nos 4 dernières nouveautés à voir immédiatement !
                  </p>
              </div>
              <NewProducts newProducts={newProducts}/>
          </div>

  );
}

export async function getServerSideProps() {
    await mongooseConnect();
    const newProducts = await Product.find({}, null, {sort: {'_id': -1}, limit: 4})

    return {
        props: {
            newProducts: JSON.parse(JSON.stringify(newProducts)),
        }
    }
}