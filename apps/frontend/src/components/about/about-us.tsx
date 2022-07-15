import { Container } from "@components/ui/container";
import { Header } from "@components/ui/header";
import { AboutCollection } from "@lib/@types/about.types";
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
  return (
    <Container type="section" className="py-section">
      <Header>{header}</Header>
      <div className="grid grid-cols-12 | gap-8 mt-7">
        {aboutCollection.map(({ _key, description, image }) => (
          <div key={_key} className="col-span-12 lg:col-span-6">
            <div>
              <SanityImg
                className="max-h-[350px] w-full | object-cover"
                width={350}
                image={image}
                builder={imageUrlBuilder}
                alt="image"
              />
            </div>
            <p className="mt-4">{description}</p>
          </div>
        ))}
      </div>
    </Container>
  );
};