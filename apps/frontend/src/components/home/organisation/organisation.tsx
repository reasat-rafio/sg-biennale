import { OrganisationProps } from "@lib/@types/home.types";
import clsx from "clsx";
import { MouseEvent, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useAnimation } from "framer-motion";
const ImageScene = dynamic(() => import("./image-scene"), {
  ssr: false,
});

export const Organisations: React.FC<OrganisationProps> = ({
  organisations,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const [selectedImg, setSelectedImg] = useState(organisations[0].logo.asset);
  const [prevSelectedImg, setPrevSelectedImage] = useState(
    organisations[1].logo.asset
  );

  // dynamic position
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
    <section
      style={{
        background: `linear-gradient(180deg, #F5F5F5 0%, rgba(245, 245, 245, 0) 100%)`,
      }}
    >
      <div className="container lg:px-32 px-10 grid grid-cols-12 justify-center items-center | lg:space-x-5 space-x-2 py-20">
        <div className="lg:col-span-5 col-span-12 space-y-6 ">
          {organisations.map(({ _key, name, title, logo }) => (
            <div
              key={_key}
              className="font-manrope cursor-pointer"
              onClick={() => {
                setPrevSelectedImage(selectedImg);
                setSelectedImg(logo.asset);
              }}
            >
              <h6 className="text-secondary-gray font-bold text-[24px] leading-tight ">
                {title}
              </h6>
              <span
                className={clsx(
                  "text-[36px] font-extrabold transition-colors duration-[400ms] ease-in-out leading-tight",
                  selectedImg._id === logo.asset._id
                    ? "text-black"
                    : "text-secondary-gray"
                )}
              >
                {name}
              </span>
            </div>
          ))}
        </div>
        <div
          className="lg:col-span-7 col-span-12 h-[60vh] relative"
          ref={cardRef}
          onMouseMove={imgContainerStateOn}
          onMouseLeave={() => {
            bgPositionAnim.start({ x: 0, y: 0 });
          }}
        >
          <motion.div
            animate={bgPositionAnim}
            className="absolute top-0 left-0 h-full w-full rounded overflow-hidden"
          >
            <ImageScene
              selectedImg={selectedImg.url}
              prevSelectedImg={prevSelectedImg.url}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
