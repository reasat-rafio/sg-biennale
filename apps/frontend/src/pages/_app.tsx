import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Navbar } from "@components/common/navigation/navbar";
import { Footer } from "@components/common/footer./footer";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useWindowSize } from "@lib/hooks";
import useGlobalStore from "@stores/global-store";
import Head from "next/head";
import { SEO } from "@components/common/seo";
import { NavDropdown } from "@components/common/navigation/dropdown";

function MyApp({ Component, pageProps }: AppProps) {
  const { addFooterHeight, addNavbarHeight, setShowNavDropDown } =
    useGlobalStore();
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

  useEffect(() => {
    setShowNavDropDown(false);
  }, [router.pathname]);

  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/png"
          href={pageProps.data?.site.site.favicon.asset.url}
        />
      </Head>
      <SEO seo={pageProps.data?.page?.seo} site={pageProps.data?.site?.site} />

      {!is404Page && <Navbar {...pageProps.data?.site?.site} />}
      <Component {...pageProps} />
      {!is404Page && (
        <>
          <Footer {...pageProps.data?.site?.site} />
          <NavDropdown {...pageProps.data?.site?.site} />
        </>
      )}
    </>
  );
}

export default MyApp;
