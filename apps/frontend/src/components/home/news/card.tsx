import {
  animationFrameEffect,
  usePortableTextTruncate,
  useVisibleScrollEffect,
  useWindowSize,
} from "@lib/hooks";
import { INewsProps } from "@lib/@types/home.types";
import { useRef } from "react";
import { useMotionValue, useSpring, useTransform, motion } from "framer-motion";
import { PortableText } from "@utils/sanity";
import dynamic from "next/dynamic";

const CardImgScene = dynamic(() => import("./card-img-scene"), { ssr: false });

export const NewsCard: React.FC<INewsProps> = ({
  description,
  header,
  images,
  index = 1,
  _id,
  length,
}) => {
  const windowWidth = useWindowSize()?.width ?? 0;
  const windowHeight = useWindowSize()?.height ?? 0;

  const cardRef = useRef<HTMLElement>(null);

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

  const [newsDescriptionRef] = usePortableTextTruncate({ maxLength: 800 });

  return (
    <motion.article
      id={_id}
      ref={cardRef}
      style={{
        y: animatedY,
      }}
      className="flex flex-col col-span-12 lg:col-span-6 | space-y-4 mx-10"
    >
      <figure className="lg:h-[488px] h-auto flex justify-center items-center bg-[#F8F8F8]">
        {/* <SanityImg
          className="w-[70%] object-cover"
          height={windowWidth >= 768 ? 500 : 200}
          builder={imageUrlBuilder}
          image={images[0]}
          alt={`${header}`}
        /> */}
        <CardImgScene url={images[0].asset.url} />
      </figure>
      <section>
        <h4 className="text-[32px] font-semibold leading-[40px]">{header}</h4>
        <div className="text-gray font-manrope" ref={newsDescriptionRef}>
          <PortableText blocks={description} />
        </div>
      </section>
    </motion.article>
  );
};
