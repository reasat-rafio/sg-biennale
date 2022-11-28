import { Container } from "@components/ui/container";
import { imageUrlBuilder } from "@utils/sanity";
import { SanityImage, SanityImg } from "sanity-react-extra";
import { motion, Variants } from "framer-motion";
import { Button } from "@components/ui/button";
import { useEffect, useState } from "react";
import { useWindowSize } from "@lib/hooks";
import { Header } from "@components/ui/header";
import Link from "next/link";

interface EssayProps {
  _id: string;
  header: string;
  url: string;
  author: string;
  images: SanityImage[];
  description: string;
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
      <div>
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "tween", duration: 0.6, ease: "easeInOut" }}
          className="flex items-center | space-x-5"
        >
          <Header
            type="h6"
            variant="secondary"
            color="#999999"
            className="flex-1"
          >
            {header}
          </Header>
          <span className="font-medium lg:text-xl text-base text-gray--700 underline">
            {curatorialEssays.length} Essays
          </span>
        </motion.header>
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={ContainerVariants}
          className="grid grid-cols-12 | lg:gap-10 gap-5 my-14"
        >
          {sortedCuratorialEssays.map((data) => (
            <Essay key={data._id} {...data} />
          ))}
        </motion.div>

        {curatorialEssays.length !== cardsPerPage && (
          <motion.div
            key={page}
            className="flex justify-center items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ type: "tween", duration: 0.6, ease: "easeInOut" }}
          >
            <Button variant="secondary" onClick={onClickShowMoreAction}>
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

const Essay: React.FC<EssayProps> = ({ header, author, images, url }) => {
  const windwoWidth = useWindowSize()?.width ?? 0;

  return (
    <Link href={url ?? ""} prefetch={false} passHref>
      <motion.a
        className="xl:col-span-4 md:col-span-6 col-span-12 space-y-5 | cursor-pointer group"
        variants={ItemVariant}
      >
        <article>
          <figure className="aspect-video overflow-hidden">
            <SanityImg
              className="h-full w-full object-cover"
              image={images[0]}
              width={windwoWidth >= 1280 ? 300 : windwoWidth >= 768 ? 250 : 200}
              builder={imageUrlBuilder}
              alt={header}
            />
          </figure>
          <header className="flex flex-col space-y-6">
            <h6 className="font-medium lg:text-heading-6 text-2xl | lg:leading-[125%] | group-hover:text-red-love | transition-colors duration-500">
              {header}
            </h6>
            {/* <Heade */}
            <span className="text-gray--400 font-manrope font-bold lg:text-body-1 text-body-2">
              {author}
            </span>
          </header>
        </article>
      </motion.a>
    </Link>
  );
};
