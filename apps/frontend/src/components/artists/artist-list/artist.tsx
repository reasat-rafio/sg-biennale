import { Slug } from "@lib/@types/global.types";
import { imageUrlBuilder } from "@utils/sanity";
import { SanityImage, SanityImg } from "sanity-react-extra";
import { motion } from "framer-motion";
import { useWindowSize } from "@lib/hooks";
import Link from "next/link";

type Screen = "desktop" | "mobile";
export interface ArtistProps {
  name: string;
  slug: Slug;
  images: SanityImage[];
  screen?: Screen;
}

export const Artist: React.FC<ArtistProps> = ({
  name,
  slug,
  images,
  screen = "desktop",
}) => {
  const windowWidth = useWindowSize()?.width ?? 0;

  return (
    <Link href={`artists/${slug.current}`} passHref>
      <motion.a
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative lg:col-span-6 col-span-12 aspect-square | bg-white | rounded overflow-hidden cursor-pointer"
      >
        <motion.article className="h-full w-full">
          <motion.figure className="flex justify-center items-center | p-[20%] | h-full w-full overflow-hidden">
            {images?.length && (
              <SanityImg
                className="h-full w-full object-cover"
                width={
                  windowWidth >= 1280 ? 500 : windowWidth >= 768 ? 250 : 150
                }
                image={images[0]}
                builder={imageUrlBuilder}
                alt={name}
              />
            )}
          </motion.figure>

          <h6 className="absolute bottom-[5%] left-[5%] | text-body-2 group-hover:text-body-1 font-manrope font-semibold text-black | pointer-events-none">
            {name}
          </h6>
        </motion.article>
      </motion.a>
    </Link>
  );
};
