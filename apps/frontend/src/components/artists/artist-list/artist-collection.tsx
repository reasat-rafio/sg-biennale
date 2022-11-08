import { useWindowSize } from "@lib/hooks";
import { imageUrlBuilder } from "@utils/sanity";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { SanityImg } from "sanity-react-extra";
import { ArtistProps } from "./artist";

type Screen = "desktop" | "mobile";
interface ArtistCollectionProps {
  artists: ArtistProps[];
  screen?: Screen;
}
interface ArtistCardProps extends ArtistProps {
  screen?: Screen;
}

export const ArtistCollection: React.FC<ArtistCollectionProps> = ({
  artists,
  screen = "desktop",
}) => {
  return (
    <section className="lg:col-span-6 col-span-12 grid grid-cols-12 gap-5">
      {artists.map((artist, index) => (
        <ArtistCard
          key={artist.slug.current + index}
          screen={screen}
          {...artist}
        />
      ))}
    </section>
  );
};

export const ArtistCard: React.FC<ArtistCardProps> = ({
  images,
  name,
  slug,
}) => {
  const windowWidth = useWindowSize()?.width ?? 0;
  return (
    <Link href={`artists/${slug.current}`} passHref prefetch={false}>
      <motion.a
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative col-span-6 aspect-square | bg-white | rounded overflow-hidden cursor-pointer "
      >
        <motion.article className="h-full w-full">
          <figure className="flex justify-center items-center | p-[20%] | h-full w-full overflow-hidden">
            {images?.length && (
              <SanityImg
                className="h-full w-full object-cover"
                width={
                  windowWidth >= 1280 ? 300 : windowWidth >= 768 ? 200 : 100
                }
                image={images[0]}
                builder={imageUrlBuilder}
                alt={name}
              />
            )}
          </figure>

          <h6 className="absolute bottom-[5%] left-[5%] | text-body-2 font-manrope font-semibold text-black | pointer-events-none">
            {name}
          </h6>
        </motion.article>
      </motion.a>
    </Link>
  );
};
