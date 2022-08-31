import {
  animationFrameEffect,
  usePortableTextTruncate,
  useVisibleScrollEffect,
  useWindowSize,
} from "@lib/hooks";
import { INewsProps } from "@lib/@types/home.types";
import { useRef, useState } from "react";
import { useMotionValue, useSpring, useTransform, motion } from "framer-motion";
import { PortableText } from "@utils/sanity";
import dynamic from "next/dynamic";
import clsx from "clsx";

const CardImgScene = dynamic(() => import("./card-img-scene"), { ssr: false });

export const NewsCard: React.FC<INewsProps> = ({
  description,
  header,
  images,
  index = 1,
  _id,
  length,
  backgroundColor,
}) => {
  const windowHeight = useWindowSize()?.height ?? 0;
  const cardRef = useRef<HTMLElement>(null);
  const [newsDescriptionRef] = usePortableTextTruncate({ maxLength: 800 });
  const [hovered, setHover] = useState(false);
  const [scalePos, setScalePos] = useState([0, 0, 0]);

  const scrollY = useMotionValue(0);
  useVisibleScrollEffect(
    cardRef,
    (offsetBoundingRect, _, y) =>
      animationFrameEffect(() => {
        const yDelta = y + windowHeight - offsetBoundingRect.top;
        const ratio = Math.max(0, Math.min(yDelta / windowHeight)) * 1500;
        scrollY.set(ratio);
      }),
    [windowHeight]
  );

  const y = useTransform(
    scrollY,
    [0, 500],
    [110 * index + 1, (length as number) - (index + 1) * -40]
  );
  const animatedY = useSpring(y, { damping: 15 });

  return (
    <motion.article
      id={_id}
      ref={cardRef}
      style={{
        y: animatedY,
      }}
      className="flex flex-col col-span-12 lg:col-span-6 | space-y-5"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={({ clientY }) => {
        if (typeof window !== "undefined") {
          const y = -(clientY / window.innerHeight) * 2 + 1;
          setScalePos([y * 0.1, y * 0.1, 1]);
        }
      }}
    >
      <motion.div
        style={{
          background: backgroundColor?.hex ? backgroundColor?.hex : "#F8F8F8",
        }}
        className={clsx(
          "xl:h-[460px] lg:h-[390px] md:h-[470px] sm:h-[350px] h-[250px] flex justify-center items-center"
        )}
      >
        <figure className="lg:h-[60%] lg:w-[70%] sm:h-[70%] sm:w-[70%] h-[85%] w-[85%] rounded overflow-hidden">
          <CardImgScene
            hovered={hovered}
            url={images[0].asset.url}
            scalePos={scalePos}
          />
        </figure>
      </motion.div>
      <section className="space-y-5">
        <h4 className="xl:text-heading-5 text-heading-6 font-semibold">
          {header}
        </h4>
        <div className="text-gray-600 font-manrope" ref={newsDescriptionRef}>
          <PortableText blocks={description} />
        </div>
      </section>
    </motion.article>
  );
};
