import useArtistsDetailsStore from "@stores/artist-details.store";
import { PortableText } from "@utils/sanity";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface ArtworkDescriptionProps {
  uniqueIndex: number;
  triggerExitAnimation: boolean;
}

const AnimationVariant: Variants = {
  initial: {
    y: "120%",
    opacity: 0,
  },
  enter: (customVal: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.6 + customVal,
      type: "tween",
      duration: 0.9,
      ease: "easeInOut",
    },
  }),
  exit: (customVal: number) => ({
    y: "120%",
    opacity: 0,
    transition: {
      delay: customVal,
      type: "tween",
    },
  }),
};

export const ArtworkDescription: React.FC<ArtworkDescriptionProps> = ({
  uniqueIndex,
  triggerExitAnimation,
}) => {
  const { selectedImage } = useArtistsDetailsStore();

  return (
    <AnimatePresence>
      {selectedImage?.index === uniqueIndex && (
        <motion.div className=" p-6 space-y-6 max-w-3xl -translate-y-1/2 max-h-[70vh] overflow-x-auto">
          <motion.div className="overflow-hidden">
            <motion.h2
              className="text-4xl text-black font-semibold"
              initial="initial"
              exit="exit"
              animate={triggerExitAnimation ? "exit" : "enter"}
              variants={AnimationVariant}
              custom={0.3}
            >
              {selectedImage.artwork.name}
            </motion.h2>
          </motion.div>

          <div className="overflow-hidden">
            <motion.div
              initial="initial"
              exit="exit"
              animate={triggerExitAnimation ? "exit" : "enter"}
              variants={AnimationVariant}
              custom={0.6}
            >
              <PortableText blocks={selectedImage.artwork.description} />
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.button
              className="bg-black text-white rounded-3xl px-10 py-3 w-fit"
              initial="initial"
              exit="exit"
              animate={triggerExitAnimation ? "exit" : "enter"}
              variants={AnimationVariant}
              custom={0.9}
            >
              See Venue
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
