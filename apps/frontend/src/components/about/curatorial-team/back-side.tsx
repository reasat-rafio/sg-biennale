import { Button } from "@components/ui/button";
import { Slug } from "@lib/@types/global.types";
import { usePortableTextTruncate } from "@lib/hooks";
import { PortableText } from "@utils/sanity";
import clsx from "clsx";
import { motion, Variants } from "framer-motion";

interface BackSideProps {
  description: string;
  slug: Slug;
  cardsPerView: number;
  active: boolean;
}

interface BackSideVariantsProps {
  active: boolean;
  description: any;
  ref: (node: HTMLElement | null) => void;
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
}) => {
  const [ref] = usePortableTextTruncate({ maxLength: 200 });
  const props = {
    active,
    description,
    ref,
  };

  return (
    <>
      {cardsPerView !== 1 ? <SlideRight {...props} /> : <ScaleUp {...props} />}
    </>
  );
};

const SlideRight: React.FC<BackSideVariantsProps> = ({
  active,
  description,
  ref,
}) => {
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
          <span className="font-mono text-body-1 text-gray-500" ref={ref}>
            <PortableText blocks={description} />
          </span>
        </div>
        <div className="w-full">
          <Button>View Director</Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ScaleUp: React.FC<BackSideVariantsProps> = ({
  active,
  description,
  ref,
}) => {
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
        <span
          className="font-mono text-body-1 text-white text-center"
          ref={ref}
        >
          <PortableText blocks={description} />
        </span>
        <Button className="!bg-white !text-black">View Director</Button>
      </div>
    </motion.div>
  );
};
