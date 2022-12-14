import { Button } from "@components/ui/button";
import { Slug } from "@lib/@types/global.types";
import { usePortableTextTruncate } from "@lib/hooks";
import useAboutStore from "@stores/about.store";
import { PortableText } from "@utils/sanity";
import clsx from "clsx";
import { motion, Variants } from "framer-motion";

export interface BackSideProps {
  description: string;
  slug: Slug;
  active: boolean;
  _key: string;
  width: number;
  className?: string;
}

export const BackSide: React.FC<BackSideProps> = (props) => {
  return (
    <>
      <SlideRightVariant className="md:block hidden" {...props} />
      <ScaleUpVarian className="md:hidden block" {...props} />
    </>
  );
};

const SlideRightVariant: React.FC<BackSideProps> = ({
  active,
  description,
  width,
  className,
  _key,
}) => {
  const { setSelectedCoArtisticDirectorId } = useAboutStore();
  const [ref] = usePortableTextTruncate({ maxLength: 250 });

  return (
    <motion.section
      style={{
        width,
      }}
      initial={{ left: 0 }}
      animate={{ left: active ? "48%" : 0 }}
      transition={{ type: "tween", duration: 0.4 }}
      className={clsx(
        "h-full absolute top-0 | pl-5 pr-10 box-border ml-auto | bg-white",
        className
      )}
      onClick={(e) => e.stopPropagation()}
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
          <Button
            onClick={() => {
              setSelectedCoArtisticDirectorId(_key);
            }}
          >
            Read More
          </Button>
        </div>
      </motion.div>
    </motion.section>
  );
};

const ScaleUpVarian: React.FC<BackSideProps> = ({
  active,
  description,
  _key,
  width,
  className,
}) => {
  const { setSelectedCoArtisticDirectorId } = useAboutStore();
  const [ref] = usePortableTextTruncate({ maxLength: 250 });

  return (
    <motion.div
      style={{
        width,
      }}
      className={clsx(
        "absolute top-0 left-0 h-full w-[105%] z-20 bg-black bg-opacity-80",
        className
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
          onClick={() => setSelectedCoArtisticDirectorId(_key)}
          className="!bg-white !text-black"
        >
          Read More
        </Button>
      </div>
    </motion.div>
  );
};
