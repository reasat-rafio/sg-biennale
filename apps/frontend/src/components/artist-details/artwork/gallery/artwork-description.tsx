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
      zIndexRange={[20, 30]}
      position={[positionXMax * 1.8, 0, 0]}
      className="w-[70vw] flex justify-center items-center -translate-y-1/2 pointer-events-none"
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
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Laboriosam dolores ut omnis similique non atque iste esse
                  inventore! Fuga totam tempora quisquam quae dolorem! Commodi
                  minus nihil veniam excepturi fugiat nulla dolorem, iure
                  pariatur voluptatum ducimus cumque, exercitationem quam porro
                  non quidem sequi! Impedit dolorem sed consectetur temporibus
                  neque praesentium voluptate consequatur, voluptatem
                  voluptates! Adipisci consequuntur provident recusandae alias
                  numquam voluptatum id asperiores voluptatibus perspiciatis
                  excepturi blanditiis sed facere, quasi odit neque vero tempore
                  necessitatibus voluptas totam nam corrupti quaerat fuga? Nam
                  tempora quas, cum similique officiis asperiores nulla, alias
                  ex quasi esse numquam aut unde repellat. Non voluptatum saepe
                  quia iusto, earum obcaecati eaque similique officiis dicta
                  iste aliquid nihil maiores assumenda nulla, temporibus et
                  culpa accusamus consequatur aut dolore animi dolorum hic
                  atque. Maiores laboriosam perspiciatis quo suscipit sunt,
                  placeat, molestiae deserunt architecto et fuga, velit quod!
                  Eum neque exercitationem cupiditate, non quis eveniet nihil
                  est. Quos minus ullam labore? Sequi ad expedita beatae
                  blanditiis animi obcaecati ipsa tenetur maxime et esse iusto
                  quam quaerat reprehenderit adipisci officiis enim ut, hic,
                  fugit repudiandae aspernatur eum voluptates, accusamus
                  explicabo. Minima sint, laborum alias ut aperiam odit quae
                  perspiciatis debitis cumque laboriosam repudiandae delectus
                  facilis sit aliquid, ipsa, ab Lorem ipsum dolor sit amet
                  consectetur, adipisicing elit. Quo debitis voluptatem natus
                  maiores aliquid aut odit dolores, consequuntur sed sint est
                  porro quasi labore corporis, possimus atque praesentium
                  quaerat obcaecati et vero dolorem! Modi in, molestias libero
                  quae quam doloribus. Veniam neque, nihil hic laborum quasi
                  enim blanditiis impedit aspernatur totam temporibus autem
                  itaque explicabo! Neque perferendis minus facilis nostrum,
                  inventore, labore reprehenderit quas molestiae et sit dolores
                  consectetur ex veniam at distinctio, alias nulla quam
                  voluptates dolor enim possimus atque. Aspernatur odit ducimus
                  ea delectus error porro alias aperiam itaque illum nesciunt,
                  consequuntur, magni impedit assumenda blanditiis tempore cum
                  ratione velit recusandae ad nobis necessitatibus eum explicabo
                  nulla et. Laborum repellat vel aperiam rem provident nisi illo
                  cupiditate voluptatem laudantium nulla saepe, deleniti
                  mollitia quia necessitatibus aliquid accusantium debitis vitae
                  corrupti rerum? Sequi quisquam hic vitae nisi mollitia sunt
                  vero nemo possimus voluptates dolorem est dolor iusto, culpa
                  odit similique dignissimos odio eligendi eum quam deserunt.
                  Aperiam consectetur reprehenderit eaque similique dolore
                  perspiciatis impedit numquam nostrum velit. Reprehenderit eos
                  maxime consectetur sed numquam obcaecati quibusdam molestiae
                  aliquam magnam illum recusandae voluptas laudantium rerum odio
                  adipisci iure facilis possimus et, fugit deserunt modi. Nam
                  est laudantium dolorem. Ipsum, neque aliquid? id?
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
        <Html
          zIndexRange={[10, 20]}
          className="w-6 h-6"
          position={[(width * w) / 2 + 0.5, height * 0.3, 0]}
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
