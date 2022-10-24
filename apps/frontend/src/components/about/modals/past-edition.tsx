import { X } from "@components/icons/x";
import { PastEditionCollection } from "@lib/@types/about.types";
import useAboutStore from "@stores/about.store";
import { imageUrlBuilder, PortableText } from "@utils/sanity";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { SanityImg } from "sanity-react-extra";
import Portal from "@reach/portal";
import { useWindowSize } from "@lib/hooks";

interface PastEditionProps {}

const ContainerVariants: Variants = {
  hidden: {
    opacity: 0,
    transition: {
      display: {
        delay: 0.5,
      },
    },
  },
  enter: {
    opacity: 1,
    transition: {},
  },
};

export const PastEdition: React.FC<PastEditionProps> = ({}) => {
  const { pastEditions, selectedPastEditionId, setSelectedPastEditionId } =
    useAboutStore();
  const [selectedPastEdition] = pastEditions.filter(
    ({ _id }) => _id === selectedPastEditionId
  );

  return (
    <Portal>
      <AnimatePresence>
        {selectedPastEditionId && (
          <motion.div
            initial="hidden"
            animate="enter"
            exit="hidden"
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

            <div className="max-w-6xl | lg:flex justify-center items-center | mx-auto lg:h-[80vh] h-screen lg:my-[10vh] overflow-y-auto | py-x lg:py-0 overflow-x-hidden">
              <Content {...selectedPastEdition} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
};

const Content: React.FC<PastEditionCollection> = ({
  name,
  description,
  _id,
  image,
}) => {
  const windowWidth = useWindowSize()?.width ?? 0;

  return (
    <motion.article className="grid grid-cols-12 px-5  ">
      <motion.section className="lg:col-span-8 col-span-12 lg:max-w-[90%] space-y-8 ">
        <motion.h6
          layoutId={`past-edition-card-header-${_id}`}
          className="font-medium text-heading-6"
        >
          {name}
        </motion.h6>

        <motion.figure className="lg:hidden block">
          <SanityImg
            className="w-full object-cover max-h-[400px]"
            width={windowWidth >= 768 ? 200 : 120}
            image={image}
            builder={imageUrlBuilder}
            alt={name}
          />
        </motion.figure>

        <motion.div
          custom={0.8}
          className="text-gray--700 font-manrope text-body-1 lg:max-h-[50vh] h-auto lg:overflow-y-auto | lg:scrollbar-thin lg:scrollbar-thumb-red-love "
        >
          <div className="lg:pr-7">
            <PortableText blocks={description} />
          </div>
        </motion.div>
      </motion.section>

      <motion.figure
        layoutId={`past-edition-card-image-${_id}`}
        className="col-span-4 lg:block hidden"
      >
        <SanityImg
          className="w-full object-cover "
          width={windowWidth >= 1280 ? 300 : windowWidth >= 768 ? 200 : 120}
          image={image}
          builder={imageUrlBuilder}
          alt={name}
        />
      </motion.figure>
    </motion.article>
  );
};
