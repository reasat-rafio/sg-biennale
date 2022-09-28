import { AnchorWrapper } from "@components/artists/anchor-wrapper";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import { SortedArtistsList } from "..";

interface ArtistsProps {
  setActiveAnchor: Dispatch<SetStateAction<string>>;
  sortedArtistsList: SortedArtistsList[];
}

export const Artists: React.FC<ArtistsProps> = ({
  sortedArtistsList,
  setActiveAnchor,
}) => {
  return (
    <div className="flex-1">
      <AnchorWrapper setActiveAnchor={setActiveAnchor}>
        {sortedArtistsList.map(({ data, title }, index) => (
          <div
            id={title}
            key={title}
            className={clsx(
              "flex flex-col | lg:py-14 py-8",
              index !== sortedArtistsList.length - 1 &&
                "border-b-2 border-black"
            )}
          >
            <h5 className="mb-7 text-xl font-medium">{title}</h5>
            <div className="grid grid-cols-12 | lg:gap-10 gap-5">
              {data.map(({ _id, name, slug }) => (
                <div
                  key={_id}
                  className="col-span-6 md:col-span-4 lg:col-span-3"
                >
                  <h2
                    style={{ wordSpacing: "2000px" }}
                    className="text-2xl font-semibold leading-snug mb-3"
                  >
                    {/* <Link href={`artists/${slug?.current ?? ""}`}>
                      <a>{name}</a>
                    </Link> */}
                  </h2>
                </div>
              ))}
            </div>
          </div>
        ))}
      </AnchorWrapper>
    </div>
  );
};
