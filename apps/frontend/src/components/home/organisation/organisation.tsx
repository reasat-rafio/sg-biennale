import { OrganisationProps } from "@lib/@types/home.types";
import clsx from "clsx";
import { MouseEvent, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useAnimation, Variants } from "framer-motion";
import { Container } from "@components/ui/container";
const ImageScene = dynamic(() => import("./image-scene"), {
  ssr: false,
});

const TextAnimationVariants: Variants = {
  enter: {
    color: "#000000",
    scale: 1.1,
    originX: 0.1,
  },
  exit: {
    color: "#999999",
    scale: 1,
  },
};

export const Organisations: React.FC<OrganisationProps> = ({
  organisations,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const [selectedImg, setSelectedImg] = useState(organisations[0].logo.asset);
  const [prevSelectedImg, setPrevSelectedImage] = useState(
    organisations[1].logo.asset
  );

  const bgPositionAnim = useAnimation();
  const imgContainerStateOn = (e: MouseEvent<HTMLDivElement, any>) => {
    const { clientX, clientY } = e;

    const XDelta =
      ((clientX -
        (cardRef?.current?.offsetLeft ??
          0 + cardRef?.current!.offsetWidth ??
          0)) /
        cardRef?.current!.offsetWidth ?? 0) - 0.5;
    const YDelta =
      ((clientY -
        (cardRef?.current?.getBoundingClientRect().top ??
          0 + cardRef?.current!.offsetHeight ??
          0)) /
        cardRef?.current!.offsetHeight ?? 0) - 0.5;

    bgPositionAnim.start({
      x: XDelta * 50,
      y: YDelta * 50,
    });
  };

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
                setPrevSelectedImage(selectedImg);
                setSelectedImg(logo.asset);
              }}
            >
              <span className="text-gray--400 font-bold font-manrope lg:text-body-1 text-body-2">
                {title}
              </span>
              <motion.h4
                initial={false}
                animate={selectedImg._id === logo.asset._id ? "enter" : "exit"}
                transition={{ duration: 0.4, type: "tween", ease: "easeInOut" }}
                variants={TextAnimationVariants}
                className={clsx("text-heading-5 font-semibold max-w-xl")}
              >
                {name}
              </motion.h4>
            </div>
          ))}
        </div>
        <div
          className="lg:col-span-5 col-span-12 | flex justify-center items-center"
          ref={cardRef}
          onMouseMove={imgContainerStateOn}
          onMouseLeave={() => {
            bgPositionAnim.start({ x: 0, y: 0 });
          }}
        >
          <motion.div
            animate={bgPositionAnim}
            className="rounded aspect-video max-h-[350px] w-full | overflow-hidden drop-shadow-[5px_0px_200px_rgba(0,0,0,0.25)] "
          >
            <ImageScene
              selectedImg={selectedImg.url}
              prevSelectedImg={prevSelectedImg.url}
            />
          </motion.div>
        </div>
      </div>
    </Container>
  );
};
