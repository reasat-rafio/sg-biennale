import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Navbar } from "@components/common/navigation/navbar";
import { Footer } from "@components/common/footer";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const is404Page = router.pathname === "/_error";

  return (
    <>
      {!is404Page && <Navbar {...pageProps.data?.site?.site} />}
      <Component {...pageProps} />
      {!is404Page && <Footer {...pageProps.data?.site?.site} />}
    </>
  );
}

export default MyApp;
