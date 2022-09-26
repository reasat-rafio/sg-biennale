import { filterLogicFactory } from "@lib/helpers/artists.helper";
import useArtistsStore from "@stores/artists.store";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface FilteringLogicProps {
  children: React.ReactNode;
}

export const FilteringLogic: React.FC<FilteringLogicProps> = ({ children }) => {
  const router = useRouter();

  const { allArtists, setFilteredArtists } = useArtistsStore();

  useEffect(() => {
    const newFilterdArtistsList = filterLogicFactory(allArtists, router);
    setFilteredArtists(newFilterdArtistsList);
  }, [router, allArtists, setFilteredArtists]);

  return <div>{children}</div>;
};
