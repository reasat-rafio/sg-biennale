import { TeamCollection } from "@lib/@types/about.types";
import { motion, Variants } from "framer-motion";
import { SanityImg, SanityImage } from "sanity-react-extra";
import clsx from "clsx";
import { imageUrlBuilder } from "@utils/sanity";

interface FrontSideProps {
  active: boolean;
  name: string;
  cardBackgroundGardiants: TeamCollection["cardBackgroundGardiants"];
  image: SanityImage;
}

export const AnimationVariants: Variants = {
  initial: {
    width: "100%",
  },
  animate: {
    width: ["100%", "40%", "50%"],
  },
};

export const FrontSide: React.FC<FrontSideProps> = ({
  name,
  active,
  cardBackgroundGardiants: { from, to },
  image,
}) => {
  return (
    <motion.div
      className="absolute h-full bottom-0 | flex flex-col justify-end z-20 cursor-pointer"
      initial="initial"
      animate={active ? "animate" : "inital"}
      variants={AnimationVariants}
      transition={{ duration: 0.6, type: "tween", ease: "easeInOut" }}
      style={{
        background: `linear-gradient(180deg, ${from.hex} 0%, ${to.hex} 100%)`,
      }}
    >
      <header className="mt-20">
        <h6 className="w-full | px-5 | text-center text-white text-heading-5 font-medium ">
          {name}
        </h6>
      </header>
      <motion.figure className={"h-[250px] mt-auto translate-y-[10%]"}>
        <SanityImg
          className={clsx(
            "pointer-events-none h-full w-full object-contain transition-transform duration-500 ease-in-out",
            active ? "scale-125" : "scale-100"
          )}
          image={image}
          builder={imageUrlBuilder}
        />
      </motion.figure>
    </motion.div>
  );
};
