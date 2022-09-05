import { SlideupLettersAnimation } from "@components/ui/animated-component/slideup-letters-animation";
import { Button } from "@components/ui/button";
import { Cta } from "@lib/@types/global.types";
import { useWindowSize } from "@lib/hooks";
import { imageUrlBuilder } from "@utils/sanity";
import clsx from "clsx";
import { useCallback, useState } from "react";
import { SanityImage, SanityImg } from "sanity-react-extra";
import { motion } from "framer-motion";

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
      <motion.h2 className="text-red-love font-medium xl:text-heading-4 text-heading-5 | overflow-hidden">
        <SlideupLettersAnimation
          animationType="inview"
          intersecting={intersecting}
        >
          {header}
        </SlideupLettersAnimation>
      </motion.h2>
      <p className="font-manrope text-body-2 text-gray--700">{description}</p>
      <div className="xl:pt-9 pt-5">
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
      </div>
    </div>
  );
};
