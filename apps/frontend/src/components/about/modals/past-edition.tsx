import { X } from "@components/icons/x";
import { Container } from "@components/ui/container";
import { PastEditionCollection } from "@lib/@types/about.types";
import { lockBody, unlockBody } from "@lib/helpers/global.helpers";
import useAboutStore from "@stores/about.store";
import { imageUrlBuilder, PortableText } from "@utils/sanity";
import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { SanityImg } from "sanity-react-extra";

interface PastEditionProps {}

const ContainerVariants: Variants = {
  hidden: {
    opacity: 0,
    display: "none",
    transition: {
      display: {
        delay: 0.5,
      },
      opacity: {
        duration: 0.5,
      },
    },
  },
  enter: {
    opacity: 1,
    display: "block",
    transition: {
      opacity: {
        duration: 0.5,
        delay: 0.2,
      },
    },
  },
};

const TextVariants: Variants = {
  hidden: (delay) => ({
    opacity: 0,
    transition: {
      delay,
    },
  }),
  enter: (delay: number) => ({
    opacity: 1,
    transition: {
      delay,
    },
  }),
};

export const PastEdition: React.FC<PastEditionProps> = ({}) => {
  const [pastEditionChunk, setPastEditionChunk] = useState<
    PastEditionCollection[]
  >([]);

  const { pastEditions, selectedPastEditionId, setSelectedPastEditionId } =
    useAboutStore();

  const [selectedPastEdition] = pastEditions.filter(
    ({ _id }) => _id === selectedPastEditionId
  );

  // useEffect(() => {
  //   selectedPastEditionId ? lockBody() : unlockBody();
  // }, [selectedPastEditionId]);

  return (
    <motion.div
      layout
      initial="hidden"
      animate={selectedPastEditionId ? "enter" : "hidden"}
      variants={ContainerVariants}
      className="fixed min-h-screen w-screen top-0 left-0 z-50 | bg-white"
    >
      <X
        onClick={() => setSelectedPastEditionId(null)}
        className="h-6 w-6 fixed top-10 right-10 | cursor-pointer"
      />
      {/*   */}
      <div className="max-w-6xl | flex justify-center items-center | mx-auto h-[80vh] my-[10vh] overflow-auto">
        {selectedPastEdition && <Active {...selectedPastEdition} />}
      </div>
    </motion.div>
  );
};

const Active: React.FC<PastEditionCollection> = ({
  name,
  description,
  _id,
  image,
}) => {
  return (
    <motion.article className="grid grid-cols-12">
      <motion.section className="col-span-8 max-w-[90%]">
        <motion.h6
          layoutId={`${_id}-name`}
          className="font-medium text-heading-6 mb-10 cursor-pointer"
        >
          {name}
        </motion.h6>
        <motion.div className="text-gray--700 font-manrope text-body-1 max-h-[50vh] overflow-y-auto | scrollbar-thin scrollbar-thumb-red-love">
          <div className="pr-7">
            <PortableText blocks={description} />
          </div>
        </motion.div>
      </motion.section>
      <motion.figure layoutId={`${_id}-img`} className="col-span-4">
        <SanityImg
          className="w-full object-cover "
          width={400}
          image={image}
          builder={imageUrlBuilder}
          alt=""
        />
      </motion.figure>
    </motion.article>
  );
};
