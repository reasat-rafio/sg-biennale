import { SlideupLettersAnimation } from "@components/ui/animated-component/slideup-letters-animation";
import { Button } from "@components/ui/button";
import { Cta } from "@lib/@types/global.types";
import { useWindowSize } from "@lib/hooks";
import { imageUrlBuilder } from "@utils/sanity";
import clsx from "clsx";
import { useCallback, useState } from "react";
import { SanityImage, SanityImg } from "sanity-react-extra";
import { motion } from "framer-motion";
import { Image } from "./image";
import { Header as SectionHeader } from "@components/ui/header";

export const Header: React.FC<{
  header: string;
  description: string;
  cta: Cta;
  intersecting: boolean | undefined;
  image?: SanityImage;
}> = ({ header, description, cta, intersecting, image }) => {
  const windowWidth = useWindowSize()?.width ?? 0;
  const [positionedAtRight, setPositionedAtRight] = useState(false);

  const headerRef = useCallback(
    (node: HTMLElement | null) => {
      if (node !== null) {
        node.getBoundingClientRect().left + 224 > windowWidth / 2
          ? setPositionedAtRight(true)
          : setPositionedAtRight(false);
      }
    },
    [windowWidth]
  );

  return (
    <div
      ref={headerRef}
      className={clsx(
        "row-span-4 | flex flex-col | border-b | space-y-4 py-5",
        image ? "justify-center" : "justify-start",
        positionedAtRight ? "max-w-2xl" : "xl:pl-max"
      )}
    >
      <SectionHeader color="#DE5742">
        {/* <SlideupLettersAnimation
          animationType="inview"
          intersecting={intersecting}
        > */}
        {header}
        {/* </SlideupLettersAnimation> */}
      </SectionHeader>

      {image && windowWidth < 1024 && (
        <div className="flex justify-center items-center overflow-hidden">
          <Image url={image} />
        </div>
      )}

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { delay: 0.8 } }}
        className="font-manrope text-body-2 text-gray--700"
      >
        {description}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: "50%" }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: {
            delay: 1.2,
            duration: 0.3,
            type: "tween",
            ease: "easeInOut",
          },
        }}
        className="xl:pt-9 pt-5"
      >
        <Button
          variant="secondary"
          type="href"
          href={cta?.href}
          icon={
            <SanityImg
              className="w-[14px] h-[13px]"
              width={14}
              image={cta.icon}
              builder={imageUrlBuilder}
              alt="download icon"
            />
          }
        >
          {cta.title}
        </Button>
      </motion.div>
    </div>
  );
};
