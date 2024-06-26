import { getLocalStorage, setLocalStorage } from '@/lib/storageConsent';
import { useState, useEffect } from 'react';

export default function CookieBanner(){
    const [cookieConsent, setCookieConsent] = useState(null);

    useEffect(() => {
        const storedCookieConsent = getLocalStorage("cookie_consent", null);
        setCookieConsent(storedCookieConsent);
    }, [setCookieConsent]);

    useEffect(() => {
        const newValue = cookieConsent ? 'granted' : 'denied';

        window.gtag("consent", 'update', {
            'ad_user_data': newValue,
            'ad_personalization': newValue,
            'ad_storage': newValue,
            'analytics_storage': newValue,
        });
        setLocalStorage("cookie_consent", cookieConsent);

        const cleanupLocalStorage = () => {
            setLocalStorage("cookie_consent", null);
        };
        window.addEventListener('beforeunload', cleanupLocalStorage);

        return () => {
            window.removeEventListener('beforeunload', cleanupLocalStorage);
        };
    }, [cookieConsent]);

    return (
        <div className={`my-10 mx-auto max-w-max md:max-w-screen-sm
                        fixed bottom-0 left-0 right-0 
                        ${cookieConsent != null ? "hidden" : "flex"} px-3 md:px-4 py-3 justify-between items-center flex-col sm:flex-row gap-4 z-50
                         bg-gray-200 rounded-lg shadow`}>

            <div className='text-center'>
                <p>Nous utilisons des <span className='font-bold text-tennis'>cookies</span> sur notre site.</p>
            </div>


            <div className='flex gap-2'>
                <button className='px-5 py-2 text-gray-500 rounded-md border-gray-900' onClick={() => setCookieConsent(false)}>Refuser</button>
                <button className='bg-gray-500 px-5 py-2 text-white rounded-lg' onClick={() => setCookieConsent(true)}>Accepter</button>
            </div>
        </div>
    )}