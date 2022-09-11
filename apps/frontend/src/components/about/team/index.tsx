import { Container } from "@components/ui/container";
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
        <h2 className="2xl:max-w-2xl lg:max-w-lg max-w-md | 2xl:text-heading-4 lg:text-heading-5 text-heading-6 font-medium leading-tight">
          {header}
        </h2>
      </Container>
      <Image header={header} image={image} />
    </section>
  );
};
