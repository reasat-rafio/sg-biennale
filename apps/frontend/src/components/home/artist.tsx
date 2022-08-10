import { IArtistProps } from "@lib/@types/home.types";
import { imageUrlBuilder } from "@utils/sanity";
import { SanityImg } from "sanity-react-extra";
import { motion } from "framer-motion";
import { useState } from "react";

interface ArtistProps {
  type: string;
  artists: IArtistProps[];
  title: string;
}

const ExpendContainerVariant = {
  initial: {
    flex: "1 1 0%",
  },
  animate: {
    flex: "3 3 0%",
  },
};

const TextVariant = {
  initial: {
    left: "5%",
  },
  animate: {
    left: "25%",
  },
};

export const Artist: React.FC<ArtistProps> = ({ artists }) => {
  const [expendedArtWorkIndex, setExpendedArtworkIndex] = useState(0);

  return (
    <section className=" flex">
      {artists.map(({ _id, artworks, name, countries }, index) => (
        <motion.div
          key={_id}
          initial="initial"
          animate={expendedArtWorkIndex === index ? "animate" : "initial"}
          variants={ExpendContainerVariant}
          transition={{
            type: "spring",
            damping: 15,
          }}
          className="relative h-[90vh] | overflow-hidden"
          onClick={() => setExpendedArtworkIndex(index)}
        >
          <SanityImg
            className="h-full w-full object-cover cursor-pointer"
            image={artworks[0].images[0]}
            builder={imageUrlBuilder}
            width={900}
          />
          <motion.div
            initial="initial"
            animate={expendedArtWorkIndex === index ? "animate" : "initial"}
            variants={TextVariant}
            className="absolute bottom-5  | font-manrope text-white"
          >
            <h6 className="text-[24px] font-bold">{name}</h6>
            <ul className="flex | mt-2 space-x-2">
              {countries.map(({ label }) => (
                <li>{label}</li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      ))}
    </section>
  );
};
