import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import Script from "next/script";

import "../styles/main.css";
import { JSX } from "react/jsx-runtime";

/**
 * Componente principal de la aplicación que envuelve todas las páginas.
 *
 * @param {AppProps} props Las propiedades de la aplicación, incluyendo el componente de página, sus props y la ruta actual.
 * @returns {JSX.Element} El componente renderizado con Google Analytics tracking.
 */
function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <AnimatePresence mode="wait">
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </>
  );
}

export default MyApp;
