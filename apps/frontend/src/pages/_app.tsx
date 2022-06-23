import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Navbar } from "@components/common/navigation/navbar";
import { Footer } from "@components/common/footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar {...pageProps.data?.site?.site} />
      <Component {...pageProps} />
      <Footer {...pageProps.data?.site?.site} />
    </>
  );
}

export default MyApp;
