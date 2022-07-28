import { ISeo } from "@lib/@types/global.types";
import { makeOpenGraphImages } from "@lib/helpers/global.helpers";
import { NextSeo } from "next-seo";

interface SEO_Props {
  seo: ISeo;
  site?: any;
}

export const SEO: React.FC<SEO_Props> = ({ seo, site }) => {
  const _ogImage = seo?.ogImage ?? site?.ogImage;
  const openGraphImages = makeOpenGraphImages(_ogImage, seo?.title);

  return (
    <NextSeo
      title={seo?.title}
      description={seo?.description}
      openGraph={{
        images: openGraphImages,
      }}
    />
  );
};
