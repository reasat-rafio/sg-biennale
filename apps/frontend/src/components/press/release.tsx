import { Container } from "@components/ui/container";
import { Cta, Slug } from "@lib/@types/global.types";
import { usePortableTextTruncate, useWindowSize } from "@lib/hooks";
import { imageUrlBuilder, PortableText } from "@utils/sanity";
import { useRef } from "react";
import { SanityImage, SanityImg } from "sanity-react-extra";
import { motion, Variants } from "framer-motion";
import { Header } from "@components/ui/header";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const windowWidth = useWindowSize()?.width ?? 0;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [descriptionRef] = usePortableTextTruncate({ maxLength: 400 });

  return (
    <Container type="section">
      <Header>{header}</Header>

      <div ref={containerRef} className="xl:columns-3 md:columns-2 columns-1">
        {releases.map((data, index) => (
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
            className="cursor-pointer | overflow-hidden | group | lg:pt-14 pt-7 space-y-4 px-4"
          >
            <figure className="flex justify-center items-center | overflow-hidden">
              <SanityImg
                className="h-full w-full object-cover | group-hover:scale-110 transition-transform duration-500 ease-in-out"
                image={data.images[0]}
                width={windowWidth >= 768 ? 500 : 400}
                builder={imageUrlBuilder}
                alt={data.header}
              />
            </figure>
            <h4
              onClick={() => router.push(data.cta.href)}
              className="text-heading-5 font-medium | group-hover:text-red-love transition-colors duration-500 ease-in-out"
            >
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
      </div>
    </Container>
  );
};
