import { Container } from "@components/ui/container";
import { Header } from "@components/ui/title";
import { Cta, Slug } from "@lib/@types/global.types";
import { doTruncate } from "@lib/helpers/global.helpers";
import {
  useIntersection,
  usePortableTextTruncate,
  useWindowSize,
} from "@lib/hooks";
import { imageUrlBuilder, PortableText } from "@utils/sanity";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { SanityImage, SanityImg } from "sanity-react-extra";
import { motion, Variant, Variants } from "framer-motion";
import clsx from "clsx";

interface ReleaseItemProps {
  _id: string;
  header: string;
  description: any[];
  images: SanityImage[];
  slug: Slug;
  cta: Cta;
  file?: any;
}

interface ReleaseProps {
  header: string;
  releases: ReleaseItemProps[];
}

const CardVariants: Variants = {
  initial: (index) => ({
    scale: 0.8,
    y: "20%",
    rotate: Math.random() < 0.5 ? -1 : 1 * index * Math.random() * 30,
  }),
  animate: {
    scale: 1,
    y: 0,
    rotate: 0,
  },
};

export const Release: React.FC<ReleaseProps> = ({ header, releases }) => {
  const windowWidth = useWindowSize()?.width ?? 0;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [descriptionRef] = usePortableTextTruncate({ maxLength: 400 });
  const [colum, setColum] = useState(3);

  useEffect(() => {
    windowWidth >= 1280
      ? setColum(3)
      : windowWidth >= 768
      ? setColum(2)
      : setColum(1);
  }, [windowWidth]);

  const _releases: ReleaseItemProps[][] = releases.reduce(
    (prev: any, curr, idx) => {
      const chunkIndex = Math.floor(idx / colum);
      if (!prev[chunkIndex]) {
        prev[chunkIndex] = [];
      }
      prev[chunkIndex].push(curr);
      return prev;
    },
    []
  );

  return (
    <Container type="section" className="">
      <Header type="h1">{header}</Header>
      <motion.div
        ref={containerRef}
        className="min-h-screen relative flex flex-wrap "
      >
        {_releases.map((release) => (
          <motion.div
            style={{
              flex: `calc(${100 / colum}%)`,
              maxWidth: `calc(${100 / colum}%)`,
            }}
            className="p-5"
          >
            {release.map((data, index) => (
              <motion.article
                key={data._id}
                initial="initial"
                whileInView="animate"
                variants={CardVariants}
                custom={index}
                transition={{
                  duration: 0.5,
                  type: "tween",
                  ease: "easeInOut",
                }}
                className={clsx(
                  "cursor-pointer space-y-4 | group | lg:pt-14 pt-7"
                )}
              >
                <figure className="flex justify-center items-center | overflow-hidden">
                  <SanityImg
                    className="h-full w-full object-cover | group-hover:scale-110 transition-transform duration-500 ease-in-out"
                    image={data.images[0]}
                    width={500}
                    builder={imageUrlBuilder}
                    alt=""
                  />
                </figure>
                <h4 className="text-heading-5 font-medium | group-hover:text-red-love transition-colors duration-500 ease-in-out">
                  {data.header}
                </h4>
                <div
                  className="text-body-2 font-manrope text-gray--700"
                  ref={descriptionRef}
                >
                  <PortableText blocks={data.description} />
                </div>
              </motion.article>
            ))}
          </motion.div>
        ))}
      </motion.div>
    </Container>
  );
};
