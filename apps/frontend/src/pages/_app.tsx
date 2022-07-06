import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Navbar } from "@components/common/navigation/navbar";
import { Footer } from "@components/common/footer./footer";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useWindowSize } from "@lib/hooks";
import useGlobalStore from "@stores/global-store";

function MyApp({ Component, pageProps }: AppProps) {
  const { addFooterHeight, addNavbarHeight } = useGlobalStore();
  const windowWidth = useWindowSize()?.width ?? 0;

  const router = useRouter();
  const is404Page = router.pathname === "/_error";

  /* 🔎 @Reason: To find out the additional page height */
  useEffect(() => {
    const navbarHeight = document.querySelector("#navbar")?.clientHeight!!;
    const footerHeight = document.querySelector("#footer")?.clientHeight!!;
    addFooterHeight(navbarHeight);
    addNavbarHeight(footerHeight);
  }, [windowWidth, addFooterHeight, addNavbarHeight]);

  return (
    <>
      {!is404Page && <Navbar {...pageProps.data?.site?.site} />}
      <Component {...pageProps} />
      {!is404Page && <Footer {...pageProps.data?.site?.site} />}
    </>
  );
}

export default MyApp;
