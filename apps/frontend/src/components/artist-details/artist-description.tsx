import clsx from "clsx";
import { IAccordion } from "@lib/@types/global.types";
import { Accordion } from "@components/common/accordion";
import { Description, Header } from "./artist-description-blocks";

interface ArtistDescriptionProps {
  name: string;
  description: any[];
  moreInfo: IAccordion[];
  className?: string;
}

export const ArtistDescription: React.FC<ArtistDescriptionProps> = ({
  name,
  description,
  moreInfo,
  className,
}) => {
  return (
    <div
      className={clsx(className, "p-5 flex flex-col space-y-7 overflow-y-auto")}
    >
      <Header name={name} />
      <Description description={description} />
      {moreInfo?.length && <Accordion moreInfo={moreInfo} />}
    </div>
  );
};
