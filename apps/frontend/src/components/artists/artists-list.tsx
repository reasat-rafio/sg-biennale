import { Container } from "@components/ui/container";
import { ArtistsProps } from "@lib/@types/artists.types";
import useArtistsStore from "@stores/artists-store";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";

interface SortedArtistsList {
  title: string;
  data: ArtistsProps[];
}

export const ArtistsList: React.FC<{}> = ({}) => {
  const { filteredArtists } = useArtistsStore();

  const [sortedArtistsList, setSortedArtistList] = useState<
    SortedArtistsList[]
  >([]);

  useEffect(() => {
    const newSortedArtistListWithTitleAsFirstLatter: SortedArtistsList[] =
      Object.values(
        filteredArtists.reduce((newVal: any, artist) => {
          let firstLetter = artist.name[0].toLocaleUpperCase();

          !newVal[firstLetter]
            ? (newVal[firstLetter] = { title: firstLetter, data: [artist] })
            : newVal[firstLetter].data.push(artist);

          return newVal;
        }, {})
      );

    const alphabeticalSorting = newSortedArtistListWithTitleAsFirstLatter.sort(
      (a, b) => (a.title > b.title ? 1 : -1)
    );

    setSortedArtistList(alphabeticalSorting);
  }, [filteredArtists]);

  return (
    <Container>
      {sortedArtistsList.map(({ data, title }, index) => (
        <div
          className={clsx(
            "flex flex-col | lg:py-14 py-8",
            index !== sortedArtistsList.length - 1 && "border-b-2 border-black"
          )}
          key={title}
        >
          <h5 className="mb-7 text-xl font-medium">{title}</h5>
          <div className="grid grid-cols-12 | lg:gap-10 gap-5">
            {data.map(({ _id, name, slug }) => (
              <div key={_id} className="col-span-6 md:col-span-4 lg:col-span-3">
                <h2
                  style={{ wordSpacing: "2000px" }}
                  className="text-2xl font-semibold leading-snug mb-3"
                >
                  <Link href={`artists/${slug?.current ?? ""}`}>
                    <a>{name}</a>
                  </Link>
                </h2>
              </div>
            ))}
          </div>
        </div>
      ))}
    </Container>
  );
};
