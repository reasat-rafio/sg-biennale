import { Container } from "@components/ui/container";
import { imageUrlBuilder } from "@utils/sanity";
import { useRouter } from "next/router";
import { SanityImage, SanityImg } from "sanity-react-extra";
import { motion, Variants } from "framer-motion";
import { Button } from "@components/ui/button";
import { useEffect, useRef, useState } from "react";
import { useIntersection } from "@lib/hooks";

interface EssayProps {
  _key: string;
  _type: string;
  author: string;
  image: SanityImage;
  title: string;
  url: string;
}

interface CuratorialEssayProps {
  type: string;
  curatorialEssays: EssayProps[];
  header: string;
}

const ContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.3,
      type: "tween",
      ease: "easeInOut",
    },
  },
};

const cardsPerPage = 6;
export const CuratorialEssay: React.FC<CuratorialEssayProps> = ({
  header,
  curatorialEssays,
}) => {
  const [page, setPage] = useState(1);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const interseciton = useIntersection(containerRef, {
    threshold: 0.2,
  })?.isIntersecting;

  const [sortedCuratorialEssays, setCuratorialEssays] = useState(
    curatorialEssays.slice(0, cardsPerPage)
  );
  const onClickShowMoreAction = () => {
    sortedCuratorialEssays < curatorialEssays
      ? setPage((prev) => prev + 1)
      : setPage(1);
  };

  useEffect(() => {
    setCuratorialEssays(curatorialEssays.slice(0, cardsPerPage * page));
  }, [page]);

  return (
    <Container type="section" className="lg:py-max py-x">
      <div ref={containerRef}>
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "tween", duration: 0.6, ease: "easeInOut" }}
          className="flex items-center | space-x-5"
        >
          <h2 className="flex-1 | font-medium lg:text-heading-6 text-2xl text-gray--400">
            {header}
          </h2>
          <span className="font-medium lg:text-xl text-base text-gray--700 underline">
            {curatorialEssays.length} Essays
          </span>
        </motion.header>
        <motion.div
          initial="hidden"
          animate={interseciton ? "show" : "hidden"}
          variants={ContainerVariants}
          className="grid grid-cols-12 | lg:gap-10 gap-5 my-14"
        >
          {sortedCuratorialEssays.map((data, index) => (
            <Essay key={data._key + index} {...data} />
          ))}
        </motion.div>

        {curatorialEssays.length !== cardsPerPage && (
          <motion.div
            key={page}
            className="flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: interseciton ? 1 : 0 }}
            transition={{ type: "tween", duration: 0.6, ease: "easeInOut" }}
          >
            <Button onClick={onClickShowMoreAction}>
              {sortedCuratorialEssays.length === curatorialEssays.length
                ? "Show Less"
                : "Show More"}
            </Button>
          </motion.div>
        )}
      </div>
    </Container>
  );
};

const ItemVariant: Variants = {
  hidden: { y: "30%", opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "tween", duration: 0.6, ease: "easeInOut" },
  },
};

const Essay: React.FC<EssayProps> = ({ title, author, image, url }) => {
  const router = useRouter();
  const onClickAction = () => router.push(url);

  return (
    <motion.article
      className="xl:col-span-4 md:col-span-6 col-span-12 space-y-5 | cursor-pointer group"
      variants={ItemVariant}
      onClick={onClickAction}
    >
      <figure className="aspect-video overflow-hidden">
        <SanityImg
          className="h-full w-full object-cover | group-hover:scale-110 | transition-all duration-500"
          image={image}
          width={400}
          builder={imageUrlBuilder}
          alt={`${title}`}
        />
      </figure>
      <header className="flex flex-col space-y-6">
        <h6 className="font-medium lg:text-heading-6 text-2xl | lg:leading-[125%] | group-hover:text-red-love | transition-all duration-500">
          {title}
        </h6>
        <span className="text-gray--400 font-manrope font-bold lg:text-body-1 text-body-2">
          {author}
        </span>
      </header>
    </motion.article>
  );
};
