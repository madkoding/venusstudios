import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";

import "../styles/main.css";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <AnimatePresence mode="wait">
      <Component {...pageProps} key={router.route} />
    </AnimatePresence>
  );
}

export default MyApp;
