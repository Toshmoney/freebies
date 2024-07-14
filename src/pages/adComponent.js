import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const AdComponent = ({ adSlot }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            if (window) {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            <Helmet>
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
            </Helmet>
            <ins className="adsbygoogle"
                style={{ display: 'block',  width: '100%', height: '90px' }}
                data-ad-client="ca-pub-1754293140846060"
                data-ad-slot={adSlot}
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
        </div>
    );
};

export default AdComponent;

