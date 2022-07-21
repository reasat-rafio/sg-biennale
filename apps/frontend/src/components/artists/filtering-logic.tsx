import useArtistsStore from "@stores/artists-store";
import { useRouter } from "next/router";
import { useEffect } from "react";

type TSelectedCountry = string | string[] | undefined;

interface FilteringLogicProps {
  children: React.ReactNode;
}

/* 🚩 gatekeeper of the intended queries */
const checkerForTheIntendedQuery = (filteringKeys: string[]) => {
  return filteringKeys.includes("country") || filteringKeys.includes("veneue");
};

export const FilteringLogic: React.FC<FilteringLogicProps> = ({ children }) => {
  const router = useRouter();

  const { allArtists, setFilteredArtists } = useArtistsStore();

  useEffect(() => {
    /* 🚩 check if the qury field is not empty */
    const queryParamsNotEmpty = JSON.stringify(router.query) !== "{}";
    const queryKeys = Object.keys(router.query);

    if (queryParamsNotEmpty) {
      if (checkerForTheIntendedQuery(queryKeys)) {
        const selectedVenue = router.query.venue;
        const selectedCountry: TSelectedCountry = router.query.country;

        const filterdArtists = allArtists.filter((artist) => {
          if (selectedCountry) {
            if (typeof selectedCountry === "string") {
              return artist.country === selectedCountry;
            } else {
              return selectedCountry.some((cntry) => cntry === artist.country);
            }
          } else return artist;
        });
        setFilteredArtists(filterdArtists);
      }
    } else {
      setFilteredArtists(allArtists);
    }
  }, [router, allArtists, setFilteredArtists]);

  return <div>{children}</div>;
};
