import { X } from "@components/icons/x";
import { PastEditionCollection } from "@lib/@types/about.types";
import useAboutStore from "@stores/about.store";
import { imageUrlBuilder, PortableText } from "@utils/sanity";
import { motion, Variants } from "framer-motion";
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

export const PastEdition: React.FC<PastEditionProps> = ({}) => {
  const { pastEditions, selectedPastEditionId, setSelectedPastEditionId } =
    useAboutStore();
  const [selectedPastEdition] = pastEditions.filter(
    ({ _id }) => _id === selectedPastEditionId
  );

  return (
    <motion.div
      layout
      initial="hidden"
      animate={selectedPastEditionId ? "enter" : "hidden"}
      variants={ContainerVariants}
      className="fixed min-h-screen w-screen top-0 left-0 z-50  | bg-white"
    >
      <motion.span
        onClick={() => setSelectedPastEditionId(null)}
        className="fixed top-10 right-10 | bg-white p-1 rounded-full  | cursor-pointer"
        whileHover={{ scale: 1.1 }}
      >
        <X className="lg:h-9 lg:w-9 w-7 h-7" />
      </motion.span>

      <div className="max-w-6xl | lg:flex justify-center items-center | mx-auto lg:h-[80vh] h-screen lg:my-[10vh]  overflow-auto | py-x lg:py-0">
        {selectedPastEdition && <Edition {...selectedPastEdition} />}
      </div>
    </motion.div>
  );
};

const Edition: React.FC<PastEditionCollection> = ({
  name,
  description,
  _id,
  image,
}) => {
  return (
    <motion.article className="grid grid-cols-12 px-5  ">
      <motion.section className="lg:col-span-8 col-span-12 lg:max-w-[90%] space-y-8 ">
        <motion.h6 className="font-medium text-heading-6">{name}</motion.h6>

        <motion.figure className="lg:hidden block">
          <SanityImg
            className="w-full object-cover max-h-[400px]"
            width={400}
            image={image}
            builder={imageUrlBuilder}
            alt=""
          />
        </motion.figure>

        <motion.div
          custom={0.8}
          className="text-gray--700 font-manrope text-body-1 lg:max-h-[50vh] h-full lg:overflow-y-auto | lg:scrollbar-thin lg:scrollbar-thumb-red-love "
        >
          <div className="lg:pr-7">
            <PortableText blocks={description} />
          </div>
        </motion.div>
      </motion.section>

      <motion.figure className="col-span-4 lg:block hidden">
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
