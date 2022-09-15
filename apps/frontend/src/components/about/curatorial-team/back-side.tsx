import { Button } from "@components/ui/button";
import { Slug } from "@lib/@types/global.types";
import { usePortableTextTruncate } from "@lib/hooks";
import { PortableText } from "@utils/sanity";
import clsx from "clsx";
import { motion, Variants } from "framer-motion";

interface BackSideProps {
  description: string;
  slug: Slug;
  active: boolean;
}

export const AnimationVariants: Variants = {
  initial: {
    translateX: 0,
    opacity: 0,
  },
  animate: {
    translateX: ["0%", "100%"],
    opacity: 1,
  },
};

export const BackSide: React.FC<BackSideProps> = ({ description, active }) => {
  const [ref] = usePortableTextTruncate({ maxLength: 200 });

  return (
    <motion.div
      className={clsx(
        "absolute z-10 h-full w-1/2 | flex flex-col justify-center items-center | pl-5 pr-10 box-border ml-auto | bg-white"
      )}
      initial="initial"
      onClick={(e) => {
        e.stopPropagation();
      }}
      animate={active ? "animate" : "initial"}
      transition={{
        type: "spring",
        duration: 0.5,
      }}
      variants={AnimationVariants}
    >
      <div className="flex-1 flex justify-center items-center">
        <span className="font-mono text-body-1 text-gray-500" ref={ref}>
          <PortableText blocks={description} />
        </span>
      </div>
      <div className="w-full">
        <Button>View Artist</Button>
      </div>
    </motion.div>
  );
};
