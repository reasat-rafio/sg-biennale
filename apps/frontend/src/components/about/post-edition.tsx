import { Container } from "@components/ui/container";
import { Header } from "@components/ui/header";
import { PastEditionCollection } from "@lib/@types/about.types";
import { useWindowSize } from "@lib/hooks";
import { imageUrlBuilder } from "@utils/sanity";
import { SanityImg } from "sanity-react-extra";

interface PostEditionProps {
  type: string;
  header: string;
  pastEditionCollection: PastEditionCollection[];
}

export const PostEdition: React.FC<PostEditionProps> = ({
  header,
  pastEditionCollection,
}) => {
  const windowWidth = useWindowSize()?.width ?? 0;

  return (
    <Container type="section" className="py-section">
      <Header>{header}</Header>
      <div className="grid grid-cols-12 | mt-7 lg:gap-10 gap-5">
        {pastEditionCollection.map(({ _key, description, image, title }) => (
          <div
            key={_key}
            className=" flex flex-col | col-span-12 lg:col-span-4 | space-y-4"
          >
            <div>
              <SanityImg
                width={windowWidth >= 768 ? 600 : 300}
                className="w-full max-h-[350px] | object-contain"
                image={image}
                builder={imageUrlBuilder}
                alt={`${title}'s image`}
              />
            </div>
            <div>
              <h6 className="text-lg font-medium mb-1">{title}</h6>
              <p className="text-base">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};
