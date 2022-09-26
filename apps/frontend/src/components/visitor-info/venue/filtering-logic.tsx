import useVisitorInfoStore from "@stores/visitor-info.store";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

interface FilteringLogicProps {
  children: ReactNode;
}

/* 🚩 gatekeeper of the intended queries */
const checkerForTheIntendedQuery = (filteringKeys: string[]) => {
  return filteringKeys.includes("search") || filteringKeys.includes("sort_by");
};

export const FilteringLogic: React.FC<FilteringLogicProps> = ({ children }) => {
  const router = useRouter();

  const {
    page,
    cardsPerPage,
    searchInput,
    allVenues,
    setPage,
    setSortedVenues,
  } = useVisitorInfoStore();

  useEffect(() => {
    /* 🚩 check if the qury field is not empty */
    const queryParamsNotEmpty = JSON.stringify(router.query) !== "{}";
    const queryKeys = Object.keys(router.query);

    if (queryParamsNotEmpty && checkerForTheIntendedQuery(queryKeys)) {
      const selectedSorting = router.query.sort_by;
      const _searchInput = router.query.search;
    }
  }, [page, router.query, allVenues, setSortedVenues]);

  return <>{children}</>;
};
