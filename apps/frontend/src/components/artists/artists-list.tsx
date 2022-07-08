import { Container } from "@components/ui/container";
import { Header } from "@components/ui/header";
import { Slug } from "@lib/@types/global.types";
import { imageUrlBuilder } from "@utils/sanity";
import { useEffect, useState } from "react";
import { SanityImage, SanityImg } from "sanity-react-extra";

interface SortedArtistsList {
  title: string;
  data: ArtistsProps[];
}

interface ArtistsProps {
  _id: string;
  images: SanityImage[];
  name: string;
  slug: Slug;
}

interface ArtistsListProps {
  artists: ArtistsProps[];
}

export const ArtistsList: React.FC<ArtistsListProps> = ({ artists }) => {
  const [sortedArtistsList, setSortedArtistList] = useState<
    SortedArtistsList[]
  >([]);

  useEffect(() => {
    const newSortedArtistListWithTitleAsFirstLatter: SortedArtistsList[] =
      Object.values(
        artists.reduce((acc: any, word) => {
          let firstLetter = word.name[0].toLocaleUpperCase();
          if (!acc[firstLetter]) {
            acc[firstLetter] = { title: firstLetter, data: [word] };
          } else {
            acc[firstLetter].data.push(word);
          }
          return acc;
        }, {})
      );

    const alphabeticalSorting = newSortedArtistListWithTitleAsFirstLatter.sort(
      (a, b) => (a.title > b.title ? 1 : -1)
    );

    setSortedArtistList(alphabeticalSorting);
  }, [artists]);

  return (
    <Container>
      {sortedArtistsList.map(({ data, title }) => (
        <div className="flex flex-col | mb-8" key={title}>
          <Header>{title}</Header>
          <div className="grid grid-cols-12 | lg:gap-10 gap-5">
            {data.map(({ _id, images, name, slug }) => (
              <div key={_id} className="col-span-6 md:col-span-4 lg:col-span-3">
                <div>
                  <SanityImg
                    builder={imageUrlBuilder}
                    image={images[0]}
                    alt={name}
                  />
                </div>
                <div>
                  <h6 className="py-3">{name}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </Container>
  );
};
