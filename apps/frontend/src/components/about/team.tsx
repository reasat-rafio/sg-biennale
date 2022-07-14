import { Container } from "@components/ui/container";
import { Header } from "@components/ui/header";
import { imageUrlBuilder } from "@utils/sanity";
import { SanityImage, SanityImg } from "sanity-react-extra";

interface TeamProps {
  header: string;
  image: SanityImage;
}

export const Team: React.FC<TeamProps> = ({ header, image }) => {
  return (
    <Container type="section" className="py-section">
      <Header>{header}</Header>
      <div className="mt-7">
        <SanityImg
          width={1000}
          className="w-full max-h-[650px] | object-cover"
          image={image}
          builder={imageUrlBuilder}
          alt={`${header}'s image`}
        />
      </div>
    </Container>
  );
};
