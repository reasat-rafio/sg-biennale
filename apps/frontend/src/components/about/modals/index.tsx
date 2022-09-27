import useAboutStore from "@stores/about.store";
import { PastEdition } from "./past-edition";

interface IndexProps {}

export const Modals: React.FC<IndexProps> = ({}) => {
  return (
    <>
      <PastEdition />
    </>
  );
};
