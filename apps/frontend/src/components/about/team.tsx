import { Container } from "@components/ui/container";
import { Header } from "@components/ui/header";
import { useWindowSize } from "@lib/hooks";
import { imageUrlBuilder } from "@utils/sanity";
import { SanityImage, SanityImg } from "sanity-react-extra";

interface TeamProps {
  header: string;
  image: SanityImage;
}

export const Team: React.FC<TeamProps> = ({ header, image }) => {
  const windowWidth = useWindowSize()?.width ?? 0;

  return (
    <Container type="section" className="py-section">
      <Header>{header}</Header>
      <div className="mt-7">
        <SanityImg
          width={windowWidth >= 768 ? 1000 : 600}
          className="w-full max-h-[650px] | object-cover"
          image={image}
          builder={imageUrlBuilder}
          alt={`${header}'s image`}
        />
      </div>
    </Container>
  );
};
