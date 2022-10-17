import { Container } from "@components/ui/container";
import { useWindowSize } from "@lib/hooks";
import { imageUrlBuilder, PortableText } from "@utils/sanity";
import { SanityImg } from "sanity-react-extra";
import { Table } from "./table";

interface DescriptionProps {
  content: any;
}

export const Description: React.FC<DescriptionProps> = ({ content }) => {
  return (
    <Container className="md:pt-xl pt-x">
      <div className="prose xl:prose-xl max-w-none">
        <PortableText blocks={content} serializers={serializers} />
      </div>
    </Container>
  );
};

const serializers = {
  types: {
    table: function Video(props: any) {
      return <Table rows={props.node.rows} />;
    },
    image: function Image(props: any) {
      const windowWidth = useWindowSize()?.width ?? 0;
      return (
        <figure className="mt-5 overflow-hidden">
          <SanityImg
            className="h-full w-min object-cover"
            image={props.node}
            builder={imageUrlBuilder}
            width={windowWidth >= 1280 ? 600 : windowWidth >= 768 ? 400 : 200}
            alt={props.node?.alt ?? "image"}
          />
        </figure>
      );
    },
  },
};
