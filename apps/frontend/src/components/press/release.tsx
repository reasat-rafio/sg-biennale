import { Container } from "@components/ui/container";
import { SanityImage } from "sanity-react-extra";

interface ReleaseProps {
  header: string;
  releases: {
    header: string;
    description: any[];
    images: SanityImage[];
  }[];
}

export const Release: React.FC<ReleaseProps> = ({}) => {
  return (
    <Container type="section">
      <div></div>
    </Container>
  );
};
