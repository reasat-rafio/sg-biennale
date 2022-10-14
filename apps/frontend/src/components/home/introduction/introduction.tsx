import { AnimatedHeader } from "@components/ui/animated-component/animated-header";
import { Container } from "@components/ui/container";
import { IntroCarouselProps } from "@lib/@types/home.types";
import { Description } from "./description";
import { IntroCarousel } from "./intro-carousel";

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
        {header.map((text, idx, allText) => (
          <AnimatedHeader
            key={text}
            className="font-medium xl:text-heading-1 lg:text-heading-2 md:text-heading-3 sm:text-heading-4 text-heading-5"
            lineLength={allText.length}
            header={text}
            idx={idx}
          />
        ))}
      </header>

      <div className="">
        {/* <IntroCarousel collection={collection} /> */}
        <Description subtitle={subtitle} description={description} />
      </div>
    </Container>
  );
};
