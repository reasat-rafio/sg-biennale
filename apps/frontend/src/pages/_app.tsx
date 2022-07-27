import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Navbar } from "@components/common/navigation/navbar";
import { Footer } from "@components/common/footer./footer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useWindowSize } from "@lib/hooks";
import useGlobalStore from "@stores/global-store";
import { NextSeo } from "next-seo";
import { imageUrlBuilder } from "@utils/sanity";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  const { addFooterHeight, addNavbarHeight } = useGlobalStore();
  const windowWidth = useWindowSize()?.width ?? 0;

  const router = useRouter();
  const is404Page = router.pathname === "/_error";

  const ogImage =
    pageProps.data?.page?.seo?.seoImage ?? pageProps.data?.site?.site.ogImage;

  const openGraphImages = ogImage
    ? [
        { w: 800, h: 600 },
        { w: 1200, h: 630 },
        { w: 600, h: 600 },
        { w: 256, h: 256 },
      ].map(({ w, h }) => ({
        url: `${imageUrlBuilder.image(ogImage).width(w).height(h).url()}`,
        width: w,
        height: h,
        alt: `${pageProps.data?.page?.seo?.title}`,
      }))
    : [];

  /* 🔎 @Reason: To find out the additional page height */
  useEffect(() => {
    const navbarHeight = document.querySelector("#navbar")?.clientHeight!!;
    const footerHeight = document.querySelector("#footer")?.clientHeight!!;
    addFooterHeight(navbarHeight);
    addNavbarHeight(footerHeight);
  }, [windowWidth, addFooterHeight, addNavbarHeight]);

  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/png"
          href={pageProps.data?.site.site.favicon.asset.url}
        />
      </Head>
      {pageProps?.data?.page?.seo && (
        <NextSeo
          title={pageProps.data.page.seo?.title}
          description={pageProps.data.page?.seo?.description}
          openGraph={{
            images: openGraphImages,
          }}
        />
      )}

      {!is404Page && <Navbar {...pageProps.data?.site?.site} />}
      <Component {...pageProps} />
      {!is404Page && <Footer {...pageProps.data?.site?.site} />}
    </>
  );
}

export default MyApp;
