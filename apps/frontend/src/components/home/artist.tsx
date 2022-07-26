import { Container } from "@components/ui/container";
import { Header } from "@components/ui/header";
import { IArtistProps } from "@lib/@types/home.types";
import { usePortableTextTruncate, useWindowSize } from "@lib/hooks";
import { imageUrlBuilder, PortableText } from "@utils/sanity";
import { SanityImg } from "sanity-react-extra";

interface ArtistProps {
  type: string;
  artists: IArtistProps[];
  title: string;
}

export const Artist: React.FC<ArtistProps> = ({ title, artists }) => {
  return (
    <Container className="py-section" type="section">
      <Header type="h3">{title}</Header>

      <div className="grid grid-cols-12 | pt-5 lg:gap-10 gap-5">
        {artists.map((artistData) => (
          <ArtistCard key={artistData._id} {...artistData} />
        ))}
      </div>
    </Container>
  );
};

const ArtistCard: React.FC<IArtistProps> = ({ description, images, name }) => {
  const windowWidth = useWindowSize()?.width ?? 0;

  const [artistDescriptionRef, setMaxLength] = usePortableTextTruncate({
    maxLength: 400,
  });

  return (
    <div className="flex flex-col col-span-12 md:col-span-6 xl:col-span-3 | space-y-4">
      {/*lg:h-[305px] h-auto */}
      <div>
        {/* <SanityImg
          className="w-full h-full object-cover"
          height={windowWidth >= 768 ? 400 : 200}
          builder={imageUrlBuilder}
          image={images[0]}
          alt={`${name}'s image`}
        /> */}
      </div>
      <div>
        <h6 className="mb-1 | text-lg font-medium">{name}</h6>
        <div ref={artistDescriptionRef}>
          <PortableText blocks={description} />
        </div>
      </div>
    </div>
  );
};
