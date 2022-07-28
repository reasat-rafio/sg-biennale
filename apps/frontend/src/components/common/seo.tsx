import { ISeo } from "@lib/@types/global.types";
import { makeOpenGraphImages } from "@lib/helpers/global.helpers";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

interface SEO_Props {
  pageType?: "listing" | "detail";
  seo: ISeo;
  site?: any;
}

export const SEO: React.FC<SEO_Props> = ({
  pageType = "detail",
  seo,
  site,
}) => {
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [ogImage, setOgImage] = useState<any>();

  useEffect(() => {
    if (pageType === "detail") {
      const _ogImage = seo?.ogImage ?? site?.ogImage;
      setMetaTitle(seo?.title ?? "");
      const openGraphImages = makeOpenGraphImages(_ogImage, seo?.title);

      setMetaTitle(seo?.title ?? "");
      setMetaDescription(seo?.description ?? "");
      setOgImage(openGraphImages);
    } else if (pageType === "listing") {
    }
  }, [pageType]);

  return (
    <NextSeo
      title={metaTitle}
      description={metaDescription}
      openGraph={{
        images: ogImage,
      }}
    />
  );
};
