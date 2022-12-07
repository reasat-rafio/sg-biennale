import { AnimatedHeader } from "@components/ui/animated-component/animated-header";
import { Container } from "@components/ui/container";
import { IntroCarouselProps } from "@lib/@types/home.types";
import { DescriptionBlock } from "./description-block";
// import { IntroCarousel } from "./intro-carousel";

interface IntroductionProps {
  type: string;
  header?: string[];
  collection: IntroCarouselProps[];
  subtitle: string;
  description: string;
}

export const Introduction: React.FC<IntroductionProps> = ({
  header,
  // collection,
  subtitle,
  description,
}) => {
  return (
    <Container type="section" className="lg:py-x py-section overflow-hidden ">
      {Boolean(header?.length) && (
        <header>
          {header?.map((text, idx, allText) => (
            <AnimatedHeader
              key={text + idx}
              className="font-medium xl:text-heading-1 lg:text-heading-2 md:text-heading-3 sm:text-heading-4 text-heading-5"
              lineLength={allText.length}
              header={text}
              idx={idx}
            />
          ))}
        </header>
      )}

      <div className="">
        {/* <IntroCarousel collection={collection} /> */}
        <DescriptionBlock subtitle={subtitle} description={description} />
      </div>
    </Container>
  );
};
