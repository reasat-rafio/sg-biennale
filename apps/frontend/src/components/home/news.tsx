import { Container } from "@components/ui/container";
import { INewsProps } from "@lib/@types/home.types";
import { imageUrlBuilder, PortableText } from "@utils/sanity";
import { SanityImg } from "sanity-react-extra";
import { Header } from "@components/ui/header";
import {
  animationFrameEffect,
  usePortableTextTruncate,
  useVisibleScrollEffect,
  useWindowSize,
} from "@lib/hooks";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

interface NewsProps {
  type: string;
  news: INewsProps[];
  title: string;
}

export const News: React.FC<NewsProps> = ({ title, news }) => {
  return (
    <Container type="section" className="py-section">
      <Header type="h3">{title}</Header>

      <motion.div className="grid grid-cols-12 | pt-5  gap-5 my-20">
        {news.map((newsData, index) => (
          <NewsCard key={newsData._id} {...newsData} index={index + 1} />
        ))}
      </motion.div>
    </Container>
  );
};

const NewsCard: React.FC<INewsProps> = ({
  description,
  header,
  images,
  index = 1,
  _id,
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

  const y = useTransform(scrollY, [0, 600], [110 * index + 1, 0]);
  const animatedY = useSpring(y, { damping: 15 });

  const [newsDescriptionRef] = usePortableTextTruncate({ maxLength: 800 });

  return (
    <motion.article
      id={_id}
      ref={cardRef}
      style={{
        y: animatedY,
      }}
      className="flex flex-col col-span-12 lg:col-span-6 | space-y-4 mx-10 "
    >
      <figure className="lg:h-[488px] h-auto flex justify-center items-center bg-[#F8F8F8]">
        <SanityImg
          className="w-[70%] object-cover"
          height={windowWidth >= 768 ? 500 : 200}
          builder={imageUrlBuilder}
          image={images[0]}
          alt={`${header}`}
        />
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
