import { Container } from "@components/ui/container";
import { imageUrlBuilder } from "@utils/sanity";
import { useRouter } from "next/router";
import { SanityImage, SanityImg } from "sanity-react-extra";
import { motion, Variants } from "framer-motion";
import { Button } from "@components/ui/button";
import { useEffect, useState } from "react";

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
  hidden: { y: "50%", opacity: 0, height: "auto" },
  show: {
    y: 0,
    height: "auto",
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

export const CuratorialEssay: React.FC<CuratorialEssayProps> = ({
  header,
  curatorialEssays,
}) => {
  const [page, setPage] = useState(1);
  const [sortedCuratorialEssays, setCuratorialEssays] = useState(
    curatorialEssays.slice(0, 6)
  );
  const onClickShowMoreAction = () => {
    sortedCuratorialEssays < curatorialEssays
      ? setPage((prev) => prev + 1)
      : setPage(1);
  };

  useEffect(() => {
    setCuratorialEssays(curatorialEssays.slice(0, 6 * page));
  }, [page]);

  return (
    <Container className="py-max">
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "tween", duration: 0.6, ease: "easeInOut" }}
        className="flex items-center | space-x-5"
      >
        <h2 className="flex-1 | font-medium text-heading-6 text-gray--400">
          {header}
        </h2>
        <span className="font-medium text-xl text-gray--700 underline">
          {curatorialEssays.length} Essays
        </span>
      </motion.header>
      <motion.div
        initial="hidden"
        animate="show"
        variants={ContainerVariants}
        className="grid grid-cols-12 | lg:gap-10 gap-5 my-14"
      >
        {sortedCuratorialEssays.map((data, index) => (
          <Essay key={data._key + index} {...data} />
        ))}
      </motion.div>
      <motion.div
        key={page}
        className="flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "tween", duration: 0.6, ease: "easeInOut" }}
      >
        <Button onClick={onClickShowMoreAction}>
          {sortedCuratorialEssays.length === curatorialEssays.length
            ? "Show Less"
            : "Show More"}
        </Button>
      </motion.div>
      {page}
    </Container>
  );
};

const ItemVariant: Variants = {
  hidden: { y: "50%", opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "tween", duration: 0.5, ease: "easeInOut" },
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
      <figure className="h-[235px] overflow-hidden">
        <SanityImg
          className="h-full w-full object-cover | group-hover:scale-110 | transition-all duration-500"
          image={image}
          width={400}
          builder={imageUrlBuilder}
          alt={`${title}`}
        />
      </figure>
      <header className="flex flex-col space-y-6">
        <h6 className="font-medium text-heading-6 | leading-[125%] | group-hover:text-red-love | transition-all duration-500">
          {title}
        </h6>
        <span className="text-gray--400 font-manrope font-bold">{author}</span>
      </header>
    </motion.article>
  );
};
