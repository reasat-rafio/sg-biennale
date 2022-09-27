import { lockBody, unlockBody } from "@lib/helpers/global.helpers";
import useAboutStore from "@stores/about.store";
import { useEffect } from "react";
import { PastEdition } from "./past-edition";

interface IndexProps {}

export const Modals: React.FC<IndexProps> = ({}) => {
  // const { selectedPastEditionId } = useAboutStore();
  // useEffect(() => {
  //   selectedPastEditionId ? lockBody() : unlockBody();
  // }, [selectedPastEditionId]);

  return (
    <>
      <PastEdition />
    </>
  );
};
