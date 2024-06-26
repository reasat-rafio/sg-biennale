import { SanityImage, SanityImg } from "sanity-react-extra";
import { motion } from "framer-motion";
import { SlideupLettersAnimation } from "@components/ui/animated-component/slideup-letters-animation";
import {
  AnimationDuration,
  DescriptionVariants,
} from "@components/shared/page-heading";
import { imageUrlBuilder } from "@utils/sanity";
import { useWindowSize } from "@lib/hooks";

interface HeroProps {
  heading: string;
  tagline: string;
  image: SanityImage;
}

export const Hero: React.FC<HeroProps> = ({ heading, image, tagline }) => {
  const windowWidth = useWindowSize()?.width ?? 0;
  const letters = Array.from(heading);
  const headerAnimationDuration = (letters.length - 1) * 0.1 + 0.7;
  return (
    <section className="h-[95vh] relative overflow-hidden flex justify-start items-end">
      <motion.figure className="absolute top-0 left-0 h-full w-full -z-10 overflow-hidden">
        <SanityImg
          className="h-full w-full object-cover"
          image={image}
          builder={imageUrlBuilder}
          width={windowWidth >= 1280 ? 1200 : windowWidth >= 768 ? 800 : 600}
          alt={image.alt}
        />
      </motion.figure>
      <section className="max-w-[1920px] | 2xl:px-max xl:px-xxl lg:px-x sm:px-lg px-md | flex flex-col space-y-3 | xl:pt-xl md:pt-x pt-lg | justify-start items-start | -translate-y-1/2">
        <motion.h1 className="overflow-hidden text-vulcanic">
          <SlideupLettersAnimation className="xl:text-heading-4 text-heading-5 font-medium">
            {heading}
          </SlideupLettersAnimation>
        </motion.h1>
        <motion.h4
          initial="initial"
          animate="animate"
          variants={DescriptionVariants}
          custom={headerAnimationDuration}
          className="max-w-2xl | text-[#F8F8F8] text-body-1 font-manrope | pb-4 | text-left"
        >
          {tagline}
        </motion.h4>
        <motion.span
          initial="initial"
          animate="animate"
          variants={DescriptionVariants}
          custom={headerAnimationDuration + AnimationDuration}
          style={{ background: "#F3F2EC" }}
          className="h-[6px] w-[235px]"
        />
      </section>
    </section>
  );
};
