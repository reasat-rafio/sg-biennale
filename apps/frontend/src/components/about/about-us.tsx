import { Container } from "@components/ui/container";
import { Header } from "@components/ui/header";
import { AboutCollection } from "@lib/@types/about.types";
import { useWindowSize } from "@lib/hooks";
import { imageUrlBuilder } from "@utils/sanity";
import { SanityImg } from "sanity-react-extra";

interface AboutUsProps {
  type: string;
  aboutCollection: AboutCollection[];
  header: string;
}

export const AboutUs: React.FC<AboutUsProps> = ({
  aboutCollection,
  header,
}) => {
  const windowWidth = useWindowSize()?.width ?? 0;

  return (
    <Container type="section" className="py-section">
      <Header>{header}</Header>
      <div className="grid grid-cols-12 | gap-8 mt-7">
        {aboutCollection.map(({ _key, description, image }) => (
          <article key={_key} className="col-span-12 lg:col-span-6">
            <figure>
              <SanityImg
                className="max-h-[350px] w-full | object-cover"
                width={windowWidth >= 768 ? 900 : 500}
                image={image}
                builder={imageUrlBuilder}
                alt="image"
              />
            </figure>
            <p className="mt-4 text-base">{description}</p>
          </article>
        ))}
      </div>
    </Container>
  );
};
