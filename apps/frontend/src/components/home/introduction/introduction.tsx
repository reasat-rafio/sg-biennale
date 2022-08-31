import { Container } from "@components/ui/container";
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
    <Container
      type="section"
      className="xl:py-32 lg:py-24 py-16 overflow-hidden "
    >
      <header>
        {header.map((text, idx) => (
          <AnimatedHeader header={text} idx={idx} />
        ))}
      </header>

      <div className="">
        <IntroCarousel collection={collection} />
        <Description subtitle={subtitle} description={description} />
      </div>
    </Container>
  );
};
