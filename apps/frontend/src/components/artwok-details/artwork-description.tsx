import clsx from "clsx";
import { IAccordion } from "@lib/@types/global.types";
import { GoBack } from "@components/ui/go-back-cta";
import { Accordion } from "@components/common/accordion";
import { Description, Header } from "./artwork-description-blocks";

interface ArtworkDescriptionProps {
  name: string;
  description: any[];
  moreInfo: IAccordion[];
  className?: string;
}

export const ArtworkDescription: React.FC<ArtworkDescriptionProps> = ({
  name,
  description,
  moreInfo,
  className,
}) => {
  return (
    <div
      className={clsx(className, "p-5 flex flex-col space-y-7 overflow-y-auto")}
    >
      <GoBack href="/artist-artwork" title="Back to Artists & Artworks" />
      <Header name={name} />
      <Description description={description} />
      {moreInfo?.length && <Accordion moreInfo={moreInfo} />}
    </div>
  );
};