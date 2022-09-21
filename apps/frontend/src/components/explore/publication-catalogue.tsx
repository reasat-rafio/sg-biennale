import { Container } from "@components/ui/container";
import { SanityImage, SanityImg } from "sanity-react-extra";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { imageUrlBuilder } from "@utils/sanity";
import { MouseEvent, useState } from "react";
import { transform, useMotionValue, motion } from "framer-motion";
import { useTransformSpring } from "@lib/helpers/animation.helpers";

interface PublicationsAndCatalogue {
  _key: string;
  _type: string;
  author: string;
  image: SanityImage;
  title: string;
  url: string;
}

interface PublicationCatalogueProps {
  type: string;
  header: string;
  publicationsAndCatalogues: PublicationsAndCatalogue[];
}

export const PublicationCatalogue: React.FC<PublicationCatalogueProps> = ({
  header,
  publicationsAndCatalogues,
}) => {
  return (
    <section className="py-max">
      <Container className="flex items-center | space-x-5">
        <h2 className="flex-1 | font-medium lg:text-heading-6 text-2xl text-gray--400">
          {header}
        </h2>
        <span className="font-medium lg:text-xl text-base text-gray--700 underline">
          View All
        </span>
      </Container>

      <div className="xl:pl-max my-10">
        <Swiper
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 1.4,
              spaceBetween: 30,
            },
          }}
        >
          {publicationsAndCatalogues.map((data) => (
            <SwiperSlide className="py-10" key={data._key}>
              <PublicationsAndCatalogues {...data} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

const physics = {
  damping: 30,
  stiffness: 60,
  bounce: 0.1,
  mass: 10,
};
const PublicationsAndCatalogues: React.FC<PublicationsAndCatalogue> = ({
  author,
  image,
  title,
  url,
}) => {
  const [hovered, setHovered] = useState(false);
  const screenX = useMotionValue(0);
  const screenY = useMotionValue(0);
  const _rotate = useMotionValue(0);

  const x = useTransformSpring({
    value: screenX,
    outputRange: hovered ? [-50, 50] : [0, 0],
    physics,
  });
  const y = useTransformSpring({
    value: screenY,
    outputRange: hovered ? [-20, 20] : [0, 0],
    physics,
  });
  const rotate = useTransformSpring({
    value: _rotate,
    outputRange: hovered ? [-10, 10] : [0, 0],
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
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
        setHovered(false);
      }}
      className="grid grid-cols-12 gap-x-8 overflow-visible"
    >
      <div className="col-span-7 | flex flex-col space-y-5">
        <h6 className="text-heading-4 font-medium">{title}</h6>
        <span className="font-bold font-manrope text-gray--400 text-body-1">
          {author}
        </span>
      </div>
      <motion.figure
        className="col-span-5 flex "
        style={{
          x,
          y,
          rotate,
        }}
      >
        <SanityImg
          className=""
          width={400}
          builder={imageUrlBuilder}
          image={image}
          alt={title}
        />
      </motion.figure>
    </motion.article>
  );
};
