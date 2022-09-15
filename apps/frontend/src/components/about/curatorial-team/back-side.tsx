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
        "absolute z-10 h-full w-1/2 | flex flex-col justify-center items-center | p-5 ml-auto | bg-white"
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
        <span ref={ref}>
          <PortableText blocks={description} />
        </span>
      </div>
      <Button className="w-full">View Artist</Button>
    </motion.div>
  );
};
