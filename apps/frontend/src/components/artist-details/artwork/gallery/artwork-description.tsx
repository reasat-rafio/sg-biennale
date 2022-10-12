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
  positionXMin: number;
}

export const ArtworkDescription: React.FC<ArtworkDescriptionProps> = ({
  uniqueIndex,
  triggerExitAnimation,
  positionXMin,
}) => {
  const { selectedImage } = useArtistsDetailsStore();

  return (
    <Html
      zIndexRange={[20, 30]}
      position={[positionXMin * 2, 0, 0]}
      className="w-[50vw] flex justify-center items-center -translate-y-1/2 translate-x-[60%] pointer-events-none"
    >
      <AnimatePresence>
        {selectedImage?.index === uniqueIndex && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={
                triggerExitAnimation
                  ? { opacity: 0, transition: { delay: 0.9 } }
                  : { opacity: 1, transition: { delay: 0.6 } }
              }
              className=" px-6 py-10 space-y-6 max-w-3xl overflow-y-auto scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent max-h-[60vh] pointer-events-auto"
            >
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
            <motion.span
              initial={{ opacity: 0 }}
              animate={
                triggerExitAnimation
                  ? { opacity: 0, transition: { delay: 0.6 } }
                  : { opacity: 1 / 3 }
              }
              style={{
                backgroundImage: `linear-gradient(to bottom,rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 80%)`,
              }}
              className="h-[20px] w-full absolute bottom-[-2px] pointer-events-none"
            />
          </>
        )}
      </AnimatePresence>
    </Html>
  );
};

interface CloseIconProps {
  width: number;
  height: number;
  w: number;
  uniqueIndex: number;
  setTriggerExitAnimation: Dispatch<SetStateAction<boolean>>;
}

export const CloseIcon: React.FC<CloseIconProps> = ({
  w,
  width,
  height,
  uniqueIndex,
  setTriggerExitAnimation,
}) => {
  const { selectedImage, setSelectedImage } = useArtistsDetailsStore();

  return (
    <>
      {selectedImage?.index === uniqueIndex && (
        <Html zIndexRange={[10, 20]} className="w-6 h-6" position={[1, 2.5, 0]}>
          <motion.svg
            onClick={() => {
              setTriggerExitAnimation(true);
              setTimeout(() => {
                setTriggerExitAnimation(false);
                setSelectedImage(null);
              }, 1200);
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 1 }, originX: 0.5 }}
            className="h-6 w-6 cursor-pointer hover:scale-125 transition-all duration-300 ease-in-out"
            width="27"
            height="28"
            viewBox="0 0 27 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M25.5 2L1.5 26" stroke="black" stroke-width="3" />
            <path d="M1.5 2L25.5 26" stroke="black" stroke-width="3" />
          </motion.svg>
        </Html>
      )}
    </>
  );
};
