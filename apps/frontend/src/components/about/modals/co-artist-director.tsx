import { X } from "@components/icons/x";
import { TeamCollection } from "@lib/@types/about.types";
import useAboutStore from "@stores/about.store";
import { imageUrlBuilder, PortableText } from "@utils/sanity";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { SanityImg } from "sanity-react-extra";
import Portal from "@reach/portal";

interface CoArtistDirectorProps {}

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

export const CoArtistDirector: React.FC<CoArtistDirectorProps> = ({}) => {
  const {
    coArtisticDirectors,
    selectedCoArtisticDirectorId,
    setSelectedCoArtisticDirectorId,
  } = useAboutStore();
  const [selectedcoArtisticDirector] = coArtisticDirectors.filter(
    ({ _key }) => _key === selectedCoArtisticDirectorId
  );

  return (
    <Portal>
      <AnimatePresence>
        {selectedCoArtisticDirectorId && (
          <motion.div
            initial="hidden"
            animate="enter"
            exit="hidden"
            variants={ContainerVariants}
            className="fixed min-h-screen w-screen top-0 left-0 z-50  | bg-white"
          >
            <motion.span
              onClick={() => setSelectedCoArtisticDirectorId(null)}
              className="fixed top-10 right-10 | bg-white p-1 rounded-full  | cursor-pointer"
              whileHover={{ scale: 1.1 }}
            >
              <X className="lg:h-9 lg:w-9 w-7 h-7" />
            </motion.span>

            <div className="max-w-6xl | lg:flex justify-center items-center | mx-auto lg:h-[80vh] h-screen lg:my-[10vh] overflow-y-auto | py-x lg:py-0 overflow-x-hidden">
              <Content {...selectedcoArtisticDirector} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
};

const Content: React.FC<TeamCollection> = ({
  cardBackgroundGardiants: { from, to },
  team,
  _key,
}) => {
  return (
    <motion.article className="grid grid-cols-12 px-5  ">
      <motion.section className="lg:col-span-8 col-span-12 lg:max-w-[90%] space-y-8 ">
        <motion.h6
          layoutId={`co-artist-card-header-${_key}`}
          className="font-medium text-heading-6"
        >
          {team.name}
        </motion.h6>

        <motion.figure
          className="lg:hidden flex | justify-center items-end"
          style={{
            background: `linear-gradient(180deg, ${from.hex} 0%, ${to.hex} 100%)`,
          }}
        >
          <SanityImg
            className="w-full object-contain max-h-[400px]"
            width={400}
            image={team.images[0]}
            builder={imageUrlBuilder}
            alt=""
          />
        </motion.figure>

        <motion.div
          custom={0.8}
          className="text-gray--700 font-manrope text-body-1 lg:max-h-[50vh] h-auto lg:overflow-y-auto | lg:scrollbar-thin lg:scrollbar-thumb-red-love "
        >
          <div className="lg:pr-7">
            <PortableText blocks={team.description} />
          </div>
        </motion.div>
      </motion.section>

      <motion.figure
        layoutId={`co-artist-card-image-${_key}`}
        className="col-span-4 lg:flex hidden | justify-center items-end"
        style={{
          background: `linear-gradient(180deg, ${from.hex} 0%, ${to.hex} 100%)`,
        }}
      >
        <SanityImg
          className="w-full object-cover "
          width={400}
          image={team.images[0]}
          builder={imageUrlBuilder}
          alt=""
        />
      </motion.figure>
    </motion.article>
  );
};
