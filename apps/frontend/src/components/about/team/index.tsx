import { Container } from "@components/ui/container";
import { Header } from "@components/ui/header";
import { SanityImage, SanityImg } from "sanity-react-extra";
import { Image } from "./image";

interface TeamProps {
  header: string;
  image: SanityImage;
}

export const Team: React.FC<TeamProps> = ({ header, image }) => {
  return (
    <section className="py-section">
      <Container>
        <Header className="2xl:max-w-2xl lg:max-w-lg max-w-md">{header}</Header>
      </Container>
      <Image header={header} image={image} />
    </section>
  );
};
