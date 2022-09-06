import { Button } from "@components/ui/button";
import { Container } from "@components/ui/container";
import { MoreInfosProps } from "@lib/@types/visitor-info.types";
import { imageUrlBuilder } from "@utils/sanity";
import clsx from "clsx";
import {
  motion,
  MotionValue,
  transform,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { MouseEvent } from "react";
import { SanityImg, SanityImage } from "sanity-react-extra";

function useTransformSpring(value: MotionValue, range: [number, number]) {
  const transformValue = useTransform(value, [0, 1], range);
  const springValue = useSpring(transformValue, {
    damping: 10,
    stiffness: 60,
    bounce: 0.4,
  });
  return springValue;
}

export const MoreInfos: React.FC<MoreInfosProps> = ({ moreInfos }) => {
  const screenX = useMotionValue(0);
  const screenY = useMotionValue(0);
  const x = useTransformSpring(screenX, [-500, 500]);
  const y = useTransformSpring(screenY, [-200, 200]);

  function handleMouseMove(event: MouseEvent<HTMLElement>, image: SanityImage) {
    if (image) {
      const width = transform([0, window.innerWidth], [0, 1])(event.clientX);
      const height = transform([0, window.innerHeight], [0, 1])(event.clientY);
      screenX.set(width);
      screenY.set(height);
    }
  }

  return (
    <Container className="grid grid-cols-12 | gap-10 py-max">
      {moreInfos.map(({ _key, title, subtitle, description, image, cta }) => (
        <article
          onMouseMove={(e) => handleMouseMove(e, image)}
          onMouseLeave={() => {
            x.set(0);
            y.set(0);
          }}
          className={clsx(
            "grid grid-cols-12 justify-center items-center | py-10",
            image ? "col-span-12 gap-10" : "col-span-6"
          )}
          key={_key}
        >
          <section
            className={clsx("space-y-6", image ? "col-span-7" : "col-span-12")}
          >
            <h3 className="text-heading-6">{title}</h3>
            {subtitle && (
              <h6 className="text-heading-4 font-medium text-skyblue">
                {subtitle}
              </h6>
            )}
            <p className="text-body-1 text-gray--700 font-manrope">
              {description}
            </p>
            <Button variant="secondary">{cta.title}</Button>
          </section>
          {image && (
            <motion.figure style={{ x, y }} className="col-span-5 -z-20">
              <SanityImg builder={imageUrlBuilder} image={image} />
            </motion.figure>
          )}
        </article>
      ))}
    </Container>
  );
};
