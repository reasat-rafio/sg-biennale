import { Container } from "@components/ui/container";
import { IArtistProps } from "@lib/@types/home.types";
import { doTruncate } from "@lib/helpers";
import { imageUrlBuilder, PortableText } from "@utils/sanity";
import { useEffect, useRef } from "react";
import { SanityImg } from "sanity-react-extra";

interface ArtistProps {
  type: string;
  artists: IArtistProps[];
  title: string;
}

export const Artist: React.FC<ArtistProps> = ({ title, artists }) => {
  return (
    <Container className="py-5" type="section">
      <h3 className="pb-3 | text-2xl font-medium">{title}</h3>
      <div className="grid grid-cols-12 | gap-10">
        {artists.map((artistData) => (
          <ArtistCard key={artistData._id} {...artistData} />
        ))}
      </div>
    </Container>
  );
};

const ArtistCard: React.FC<IArtistProps> = ({ description, images, name }) => {
  const artistDescriptionRef = useRef<HTMLSpanElement | null>(null);

  const artistDescriptionChilds = artistDescriptionRef.current
    ?.children as HTMLCollection;

  useEffect(() => {
    if (artistDescriptionChilds?.length)
      artistDescriptionChilds[0].innerHTML = `${doTruncate(
        artistDescriptionChilds[0].textContent as string,
        400
      )} ...`;
  }, [artistDescriptionChilds]);

  return (
    <div className="flex flex-col col-span-12 md:col-span-6 xl:col-span-3 | space-y-4">
      <div className="">
        <SanityImg
          className="w-full"
          width={400}
          builder={imageUrlBuilder}
          image={images[0]}
          alt={`${name}'s image`}
        />
      </div>
      <div>
        <h6 className="mb-1 | text-lg font-medium">{name}</h6>
        <span ref={artistDescriptionRef}>
          <PortableText blocks={description} />
        </span>
      </div>
    </div>
  );
};
