import { AnimatedHeader } from "./animated-header";
import { Description } from "./description";
import { IntroCarousel, IntroCarouselProps } from "./intro-carousel";

interface IntroductionProps {
  type: string;
  header: string[];
  collection: IntroCarouselProps[];
  subtitle: string;
  description: string;
}

export const Introduction: React.FC<IntroductionProps> = ({
  header,
  collection,
  subtitle,
  description,
}) => {
  return (
    <section className="py-32 relative">
      <figure className="absolute top-0 right-0 ">
        <img src="/bg/home-shape-1.svg" alt="" />
      </figure>
      <header>
        {header.map((text, idx) => (
          <AnimatedHeader header={text} idx={idx} />
        ))}
      </header>

      <div className="container">
        <IntroCarousel collection={collection} />
        <Description subtitle={subtitle} description={description} />
      </div>
      <figure className="absolute bottom-0 left-0 max-h-[1000px] pointer-events-none">
        <img src="/bg/home-shape-2.svg" alt="" />
      </figure>
    </section>
  );
};
