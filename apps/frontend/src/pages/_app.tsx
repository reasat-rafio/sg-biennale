import { Navbar } from "@components/common/navigation/navbar";
import { SEO } from "@components/common/seo";
import { Ticker } from "@components/common/ticker";
import { ISite } from "@lib/@types/global.types";
import { useWindowSize } from "@lib/hooks";
import useGlobalStore from "@stores/global.store";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import "../styles/globals.css";
const NavDropdown = dynamic<ISite["site"]>(
  () =>
    import("@components/common/navigation/dropdown").then(
      (comp) => comp.NavDropdown
    ),
  { ssr: false }
);
const Footer = dynamic<ISite["site"]>(
  () => import("@components/common/footer./footer").then((comp) => comp.Footer),
  { ssr: false }
);

function MyApp({ Component, pageProps }: AppProps) {
  const { addNavbarHeight, setShowNavDropDown } = useGlobalStore();
  const windowWidth = useWindowSize()?.width ?? 0;

  const router = useRouter();
  const is404Page = router.pathname === "/_error";

  /* 🔎 @Reason: To find out the additional page height */
  useEffect(() => {
    const navbarHeight = document.querySelector("#navbar")?.clientHeight!!;
    addNavbarHeight(navbarHeight);
  }, [windowWidth]);

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

      {!is404Page && (
        <>
          <Navbar {...pageProps.data?.site?.site} />
          <NavDropdown {...pageProps.data?.site?.site} />
          {!!pageProps.data?.site?.site?.ticker?.length && (
            <Ticker ticker={pageProps.data.site.site.ticker} />
          )}
        </>
      )}
      <Component {...pageProps} />
      {!is404Page && <Footer {...pageProps.data?.site?.site} />}
    </>
  );
}

export default MyApp;
