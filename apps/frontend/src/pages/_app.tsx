import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Navbar } from "@components/common/navigation/navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar site={pageProps.data?.site?.site} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
