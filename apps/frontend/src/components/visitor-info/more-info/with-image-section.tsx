import { Button } from "@components/ui/button";
import { Cta } from "@lib/@types/global.types";
import { imageUrlBuilder } from "@utils/sanity";
import {
  MotionValue,
  transform,
  useMotionValue,
  useSpring,
  useTransform,
  motion,
} from "framer-motion";
import { MouseEvent, useState } from "react";
import { SanityImage, SanityImg } from "sanity-react-extra";

interface WithImageSectionProps {
  _key?: string;
  title: string;
  subtitle?: string;
  description: string;
  cta: Cta;
  image: SanityImage;
}

function useTransformSpring(
  value: MotionValue,
  range: [number, number],
  hovered: boolean
) {
  const transformValue = useTransform(value, [0, 1], hovered ? range : [0, 0]);
  const springValue = useSpring(transformValue, {
    damping: 30,
    stiffness: 60,
    bounce: 0.1,
    mass: 10,
  });
  return springValue;
}

export const WithImageSection: React.FC<WithImageSectionProps> = ({
  cta,
  description,
  image,
  title,
  _key,
  subtitle,
}) => {
  const [hovered, setHovered] = useState(false);
  const screenX = useMotionValue(0);
  const screenY = useMotionValue(0);
  const _rotate = useMotionValue(0);

  const x = useTransformSpring(screenX, [-500, 500], hovered);
  const y = useTransformSpring(screenY, [-200, 200], hovered);
  const rotate = useTransformSpring(_rotate, [-20, 20], hovered);

  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    const width = transform([0, window.innerWidth], [0, 1])(event.clientX);
    const height = transform([0, window.innerHeight], [0, 1])(event.clientY);
    const rotateX = transform(
      [0, window.innerWidth + window.innerHeight],
      [0, 1]
    )(event.clientX + event.clientY);

    screenX.set(width);
    screenY.set(height);
    _rotate.set(rotateX);
  }

  return (
    <motion.article
      key={_key}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
        setHovered(false);
      }}
      className="grid grid-cols-12 col-span-12 justify-center items-center | py-10 lg:gap-10 gap-5"
    >
      <section className="xl:col-span-7 md:col-span-6 col-span-12 | space-y-6">
        <h3 className="lg:text-heading-6 text-3xl">{title}</h3>
        {subtitle && (
          <h6 className="lg:text-heading-4 text-heading-5 font-medium text-skyblue">
            {subtitle}
          </h6>
        )}
        <p className="text-body-1 text-gray--700 font-manrope">{description}</p>
        <Button variant="secondary">{cta.title}</Button>
      </section>
      <motion.figure
        className="xl:col-span-5 md:col-span-6 col-span-12 -z-20"
        style={{
          x,
          y,
          rotate,
        }}
      >
        <SanityImg builder={imageUrlBuilder} image={image} />
      </motion.figure>
    </motion.article>
  );
};