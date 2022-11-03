import { X } from "@components/icons/x";
import { Container } from "@components/ui/container";
import { SponsorCollection } from "@lib/@types/about.types";
import { useWindowSize } from "@lib/hooks";
import { Portal } from "@reach/portal";
import useAboutStore from "@stores/about.store";
import { imageUrlBuilder } from "@utils/sanity";
import { AnimatePresence, motion } from "framer-motion";
import { SanityImg } from "sanity-react-extra";
import { ContainerVariants } from "./past-edition";

interface AboutProps {}

export const About: React.FC<AboutProps> = ({}) => {
  const { abouts, selectedAboutId, setSelectedAboutId } = useAboutStore();
  const [selectedPastEdition] = abouts.filter(
    ({ _key }) => _key === selectedAboutId
  );

  return (
    <Portal>
      <AnimatePresence>
        {selectedAboutId && (
          <motion.div
            initial="hidden"
            animate="enter"
            exit="hidden"
            variants={ContainerVariants}
            className="fixed min-h-screen w-screen top-0 left-0 z-50  | bg-white"
          >
            <motion.span
              onClick={() => setSelectedAboutId(null)}
              className="fixed top-10 right-10 | bg-white p-1 rounded-full  | cursor-pointer"
              whileHover={{ scale: 1.1 }}
            >
              <X className="lg:h-9 lg:w-9 w-7 h-7" />
            </motion.span>

            <Container>
              <div className="lg:flex justify-center items-center | lg:h-[80vh] h-screen lg:my-[10vh] overflow-y-auto | py-x lg:py-0 overflow-x-hidden">
                <Content {...selectedPastEdition} />
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
};

const Content: React.FC<SponsorCollection> = ({
  name,
  description,
  image,
  _key,
  title,
}) => {
  const windowWidth = useWindowSize()?.width ?? 0;

  return (
    <motion.article className="grid grid-cols-12 xl:gap-20 md:gap-10 ">
      <motion.figure
        layoutId={`about-us-card-image-${_key}`}
        className="col-span-6 lg:block hidden"
      >
        <SanityImg
          className="w-full object-cover shadow-md"
          width={windowWidth >= 1280 ? 450 : windowWidth >= 768 ? 200 : 120}
          image={image}
          builder={imageUrlBuilder}
          alt={name}
        />
      </motion.figure>
      <motion.section className="lg:col-span-6 col-span-12 space-y-8 ">
        <div className="flex flex-col | space-y-4">
          <motion.h4
            layoutId={`about-us-card-title-${_key}`}
            className="text-gray--400 font-bold font-manrope lg:text-body-1 text-body-2"
          >
            {title}
          </motion.h4>
          <motion.h5
            layoutId={`about-us-card-name-${_key}`}
            className={"lg:text-heading-5 text-heading-6 font-semibold"}
          >
            {name}
          </motion.h5>

          <motion.figure className="lg:hidden block">
            <SanityImg
              className="w-full object-cover max-h-[400px]"
              width={windowWidth >= 768 ? 250 : 120}
              image={image}
              builder={imageUrlBuilder}
              alt={name}
            />
          </motion.figure>
          <motion.p
            layoutId={`about-us-card-description-${_key}`}
            className="font-manrope text-body-1 | text-gray--700"
          >
            {description}
          </motion.p>
        </div>
      </motion.section>
    </motion.article>
  );
};
