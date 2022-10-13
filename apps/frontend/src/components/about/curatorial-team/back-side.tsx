import { Button } from "@components/ui/button";
import { Slug } from "@lib/@types/global.types";
import { usePortableTextTruncate } from "@lib/hooks";
import useAboutStore from "@stores/about.store";
import { PortableText } from "@utils/sanity";
import clsx from "clsx";
import { motion, Variants } from "framer-motion";

interface BackSideProps {
  description: string;
  slug: Slug;
  cardsPerView: number;
  active: boolean;
  id: string;
}

interface BackSideVariantsProps {
  active: boolean;
  description: any;
  id: string;
}

const SlideRightAnimationVariants: Variants = {
  initial: {
    translateX: 0,
    opacity: 0,
  },
  animate: {
    translateX: ["0%", "100%"],
    opacity: 1,
  },
};

export const BackSide: React.FC<BackSideProps> = ({
  description,
  active,
  cardsPerView,
  id,
}) => {
  const props = {
    active,
    description,
    id,
  };

  return (
    <>
      {cardsPerView !== 1 ? (
        <SlideRightVariant {...props} />
      ) : (
        <ScaleUpVarian {...props} />
      )}
    </>
  );
};

const SlideRightVariant: React.FC<BackSideVariantsProps> = ({
  active,
  description,
  id,
}) => {
  const { setSelectedCoArtisticDirectorId } = useAboutStore();
  const [ref] = usePortableTextTruncate({ maxLength: 250 });

  return (
    <motion.div
      className={clsx(
        "absolute z-10 h-full w-1/2 |  pl-5 pr-10 box-border ml-auto | bg-white"
      )}
      initial="initial"
      onClick={(e) => e.stopPropagation()}
      animate={active ? "animate" : "initial"}
      transition={{
        type: "spring",
        duration: 0.5,
      }}
      variants={SlideRightAnimationVariants}
    >
      <motion.div
        className="flex flex-col justify-center items-center | h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{
          duration: 0.3,
          type: "tween",
          ease: "easeInOut",
          delay: 0.4,
        }}
      >
        <div className="flex-1 flex justify-center items-center">
          <div className="font-manrope text-body-1 text-gray-500" ref={ref}>
            <PortableText blocks={description} />
          </div>
        </div>
        <div className="w-full">
          <Button onClick={() => setSelectedCoArtisticDirectorId(id)}>
            View Director
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ScaleUpVarian: React.FC<BackSideVariantsProps> = ({
  active,
  description,
  id,
}) => {
  const { setSelectedCoArtisticDirectorId } = useAboutStore();
  const [ref] = usePortableTextTruncate({ maxLength: 250 });

  return (
    <motion.div
      className={clsx(
        "absolute top-0 left-0 h-full w-full z-20 bg-black bg-opacity-80"
      )}
      initial={{ opacity: 0, y: 100 }}
      animate={{
        opacity: active ? 1 : 0,
        y: active ? 0 : 100,
      }}
      transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
    >
      <div className="w-[80%] mx-auto flex justify-center items-center flex-col h-full space-y-5">
        <div
          className="font-manrope text-body-1 text-white text-center"
          ref={ref}
        >
          <PortableText blocks={description} />
        </div>
        <Button
          onClick={() => setSelectedCoArtisticDirectorId(id)}
          className="!bg-white !text-black"
        >
          View Director
        </Button>
      </div>
    </motion.div>
  );
};
