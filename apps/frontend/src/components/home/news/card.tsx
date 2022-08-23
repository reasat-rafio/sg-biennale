import {
  animationFrameEffect,
  usePortableTextTruncate,
  useVisibleScrollEffect,
  useWindowSize,
} from "@lib/hooks";
import { INewsProps } from "@lib/@types/home.types";
import { useRef, useState } from "react";
import {
  useMotionValue,
  useSpring,
  useTransform,
  motion,
  useAnimation,
} from "framer-motion";
import { PortableText } from "@utils/sanity";
import dynamic from "next/dynamic";
import {
  useSpring as RSpringUseSpring,
  animated,
  config,
} from "@react-spring/three";

const CardImgScene = dynamic(() => import("./card-img-scene"), { ssr: false });

export const NewsCard: React.FC<INewsProps> = ({
  description,
  header,
  images,
  index = 1,
  _id,
  length,
}) => {
  const windowHeight = useWindowSize()?.height ?? 0;
  const cardRef = useRef<HTMLElement>(null);
  const [newsDescriptionRef] = usePortableTextTruncate({ maxLength: 800 });
  const [hovered, setHover] = useState(false);

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

  const [cardImageAnimationProps, set] = RSpringUseSpring(() => ({
    pos: [0, 0, 0],
    scale: [1, 1, 1],
    config: { mass: 10, tension: 1000, friction: 300, precision: 0.00001 },
  }));

  return (
    <motion.article
      id={_id}
      ref={cardRef}
      style={{
        y: animatedY,
      }}
      className="flex flex-col col-span-12 lg:col-span-6 | space-y-4 mx-10"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={({ clientX, clientY }) => {
        if (typeof window !== "undefined") {
          const x = (clientX / window.innerWidth) * 2 - 1;
          const y = -(clientY / window.innerHeight) * 2 + 1;

          set({
            pos: [x, 0, 0],
            scale: [1 - y * 0.1, 1 - y * 0.1, 1],
          });
        }
      }}
    >
      <motion.figure className="lg:h-[488px] h-auto flex justify-center items-center bg-[#F8F8F8]">
        <CardImgScene
          hovered={hovered}
          url={images[0].asset.url}
          cardImageAnimationProps={cardImageAnimationProps}
        />
      </motion.figure>
      <section>
        <h4 className="text-[32px] font-semibold leading-[40px]">{header}</h4>
        <div className="text-gray font-manrope" ref={newsDescriptionRef}>
          <PortableText blocks={description} />
        </div>
      </section>
    </motion.article>
  );
};
