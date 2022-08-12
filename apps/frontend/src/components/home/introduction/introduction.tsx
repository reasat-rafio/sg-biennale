import { imageUrlBuilder } from "@utils/sanity";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SanityImg } from "sanity-react-extra";
import { AnimatedHeader } from "./animated-header";
import { IntroCarousel, IntroCarouselProps } from "./intro-carousel";

interface IntroductionProps {
  type: string;
  header: string[];
  collection: IntroCarouselProps[];
  description: string;
}

export const Introduction: React.FC<IntroductionProps> = ({
  header,
  collection,
}) => {
  return (
    <section className="py-32 mx-20">
      <header>
        {header.map((text, idx) => (
          <AnimatedHeader header={text} idx={idx} />
        ))}
      </header>
      <IntroCarousel collection={collection} />
    </section>
  );
};
