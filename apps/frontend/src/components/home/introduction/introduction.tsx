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
    <section className="py-32 mx-20">
      <header>
        {header.map((text, idx) => (
          <AnimatedHeader header={text} idx={idx} />
        ))}
      </header>

      <div className="container">
        <IntroCarousel collection={collection} />
        <Description subtitle={subtitle} description={description} />
      </div>
    </section>
  );
};
