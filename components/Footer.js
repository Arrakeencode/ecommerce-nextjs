export default function Footer(){
    return (
    <footer className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 pb-12 sm:px-6 lg:px-8">


            <div className=" border-t border-gray-100 pt-8">
                <div className="sm:flex sm:justify-between">
                    <p className="text-xs text-gray-500">&copy; 2022. Company Name. All rights reserved.</p>

                    <ul className="mt-8 flex flex-wrap justify-start gap-4 text-xs sm:mt-0 lg:justify-end">
                        <li>
                            <a href="mailto:bryanjustb@gmail.com" className="text-gray-500 transition hover:opacity-75"> Contact </a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-500 transition hover:opacity-75"> Politique de confidentialité </a>
                        </li>

                        <li>
                            <a href="#" className="text-gray-500 transition hover:opacity-75"> Mention légale </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
    )
}