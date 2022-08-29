import { Html } from "@react-three/drei";
import useArtistsDetailsStore from "@stores/artist-details.store";
import { PortableText } from "@utils/sanity";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

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

interface ArtworkDescriptionProps {
  uniqueIndex: number;
  triggerExitAnimation: boolean;
  positionXMax: number;
}

export const ArtworkDescription: React.FC<ArtworkDescriptionProps> = ({
  uniqueIndex,
  triggerExitAnimation,
  positionXMax,
}) => {
  const { selectedImage } = useArtistsDetailsStore();

  return (
    <Html
      position={[positionXMax - 5.5, 0, 0]}
      className="w-[75vw] flex justify-center items-center"
    >
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
    </Html>
  );
};

interface CloseIconProps {
  data: any;
  w: number;
  uniqueIndex: number;
  setTriggerExitAnimation: Dispatch<SetStateAction<boolean>>;
}

export const CloseIcon: React.FC<CloseIconProps> = ({
  data,
  w,
  uniqueIndex,
  setTriggerExitAnimation,
}) => {
  const { selectedImage, setSelectedImage } = useArtistsDetailsStore();

  return (
    <>
      {selectedImage?.index === uniqueIndex && (
        <Html
          className="w-6 h-6"
          position={[(data.width * w) / 2 + 0.5, data.height / 2.5, 0]}
        >
          <motion.img
            onClick={() => {
              setTriggerExitAnimation(true);
              setTimeout(() => {
                setTriggerExitAnimation(false);
                setSelectedImage(null);
              }, 1200);
            }}
            className="h-10 w-10 cursor-pointer hover:scale-125 transition-all duration-300 ease-in-out"
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 1 } }}
            src="/icons/cross.svg"
            alt="close icon"
          />
        </Html>
      )}
    </>
  );
};
