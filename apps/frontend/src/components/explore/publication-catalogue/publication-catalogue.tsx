import { Header } from "@components/ui/header";
import { Slug } from "@lib/@types/global.types";
import { useWindowSize } from "@lib/hooks";
import { imageUrlBuilder } from "@utils/sanity";
import { SanityImage, SanityImg } from "sanity-react-extra";

export interface PublicationsAndCatalogue {
  _id: string;
  header: string;
  slug: Slug;
  author: string;
  images: SanityImage[];
  description: string;
}

export const PublicationCatalogue: React.FC<PublicationsAndCatalogue> = ({
  author,
  images,
  header,
}) => {
  const windwoWidth = useWindowSize()?.width ?? 0;

  return (
    <article className="grid grid-cols-12 gap-x-8 overflow-visible lg:h-auto">
      <div className="lg:col-span-7 col-span-12 | flex flex-col space-y-5">
        <Header
          type="h6"
          className="hover:text-red-love cursor-pointer | transition-colors duration-500"
        >
          {header}
        </Header>
        <span className="font-bold font-manrope text-gray--400 text-body-1">
          {author}
        </span>
      </div>
      <figure className="aspect-video lg:col-span-5 col-span-12 | lg:mt-0 mt-5">
        <SanityImg
          className="w-full h-full object-cover"
          width={windwoWidth >= 1280 ? 300 : windwoWidth >= 768 ? 250 : 200}
          builder={imageUrlBuilder}
          image={images[0]}
          alt={header}
        />
      </figure>
    </article>
  );
};
