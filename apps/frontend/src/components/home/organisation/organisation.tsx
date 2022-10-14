import { OrganisationProps } from "@lib/@types/home.types";
import clsx from "clsx";
import { MouseEvent, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useAnimation, Variants } from "framer-motion";
import { Container } from "@components/ui/container";
import { SanityImg } from "sanity-react-extra";
import { imageUrlBuilder } from "@utils/sanity";
import { useWindowSize } from "@lib/hooks";
const ImageScene = dynamic(() => import("./image-scene"), {
  ssr: false,
});

const TextAnimationVariants: Variants = {
  enter: {
    color: "#000000",
    scale: 1,
    originX: 0.5,
  },
  exit: {
    color: "#999999",
    scale: 0.95,
    originX: 0,
  },
};

export const Organisations: React.FC<OrganisationProps> = ({
  organisations,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const windowWidth = useWindowSize()?.width ?? 0;

  const [selectedImg, setSelectedImg] = useState(organisations[0].logo);
  // const [prevSelectedImg, setPrevSelectedImage] = useState(
  //   organisations[1].logo
  // );

  // const bgPositionAnim = useAnimation();
  // const imgContainerStateOn = (e: MouseEvent<HTMLDivElement, any>) => {
  //   const { clientX, clientY } = e;

  //   const XDelta =
  //     ((clientX -
  //       (cardRef?.current?.offsetLeft ??
  //         0 + cardRef?.current!.offsetWidth ??
  //         0)) /
  //       cardRef?.current!.offsetWidth ?? 0) - 0.5;
  //   const YDelta =
  //     ((clientY -
  //       (cardRef?.current?.getBoundingClientRect().top ??
  //         0 + cardRef?.current!.offsetHeight ??
  //         0)) /
  //       cardRef?.current!.offsetHeight ?? 0) - 0.5;

  //   bgPositionAnim.start({
  //     x: XDelta * 60,
  //     y: YDelta * 60,
  //     rotate: (XDelta + YDelta) * 5,
  //   });
  // };

  return (
    <Container
      className="py-32"
      style={{
        background: `linear-gradient(180deg, #F5F5F5 0%, rgba(245, 245, 245, 0) 100%)`,
      }}
    >
      <div className="grid grid-cols-12 justify-center items-center | lg:space-x-5 lg:space-y-0 space-y-8">
        <div className="lg:col-span-7 col-span-12 lg:space-y-16 space-y-8">
          {organisations.map(({ _key, name, title, logo }) => (
            <div
              key={_key}
              className="font-manrope cursor-pointer | space-y-4"
              onClick={() => {
                // setPrevSelectedImage(selectedImg);
                setSelectedImg(logo);
              }}
            >
              <span className="text-gray--400 font-bold font-manrope lg:text-body-1 text-body-2">
                {title}
              </span>
              <motion.h4
                initial={false}
                animate={
                  selectedImg.asset._id === logo.asset._id ? "enter" : "exit"
                }
                transition={{ duration: 0.4, type: "tween", ease: "easeInOut" }}
                variants={TextAnimationVariants}
                className={clsx(
                  "lg:text-heading-5 text-heading-6 font-semibold max-w-xl"
                )}
              >
                {name}
              </motion.h4>
            </div>
          ))}
        </div>
        <div
          className="lg:col-span-5 col-span-12 | flex justify-center items-center"
          ref={cardRef}
          // onMouseMove={imgContainerStateOn}
          // onMouseLeave={() => {
          //   bgPositionAnim.start({
          //     x: 0,
          //     y: 0,
          //     rotate: 0,
          //   });
          // }}
        >
          <motion.div
            key={selectedImg.asset._id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
            // animate={bgPositionAnim}
            className="rounded aspect-video max-h-[350px] w-full | overflow-hidden drop-shadow-[5px_0px_200px_rgba(0,0,0,0.25)] "
          >
            {/* <ImageScene
              selectedImg={selectedImg.url}
              prevSelectedImg={prevSelectedImg.url}
            /> */}
            <SanityImg
              className="w-full h-full"
              image={selectedImg}
              builder={imageUrlBuilder}
              alt={selectedImg.alt}
              width={windowWidth >= 1024 ? 500 : windowWidth >= 680 ? 300 : 200}
            />
          </motion.div>
        </div>
      </div>
    </Container>
  );
};
