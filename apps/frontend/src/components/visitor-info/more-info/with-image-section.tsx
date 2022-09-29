import { Button } from "@components/ui/button";
import { Header } from "@components/ui/header";
import { Cta } from "@lib/@types/global.types";
import { useTransformSpring } from "@lib/helpers/animation.helpers";
import { imageUrlBuilder } from "@utils/sanity";
import { transform, useMotionValue, motion } from "framer-motion";
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

const physics = {
  damping: 30,
  stiffness: 60,
  bounce: 0.1,
  mass: 10,
};

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

  const x = useTransformSpring({
    value: screenX,
    outputRange: hovered ? [-100, 100] : [0, 0],
    physics,
  });
  const y = useTransformSpring({
    value: screenY,
    outputRange: hovered ? [-100, 100] : [0, 0],
    physics,
  });
  const rotate = useTransformSpring({
    value: _rotate,
    outputRange: hovered ? [-10, 15] : [0, 0],
    physics,
  });

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
        <Header variant="secondary">{title}</Header>
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
