import { ChevronArrow } from "@components/icons/chevron-arrow";
import { IAccordion } from "@lib/@types/global.types";
import clsx from "clsx";
import { useState } from "react";

export const Accordion: React.FC<{
  moreInfo: IAccordion[];
}> = ({ moreInfo }) => {
  const [activeAccordionIndex, setActiveAccordionIndex] = useState<
    number | null
  >(null);

  const toggleAccordion = (accordionIndex: number) => {
    if (activeAccordionIndex === accordionIndex) setActiveAccordionIndex(null);
    else setActiveAccordionIndex(accordionIndex);
  };
  return (
    <div className="">
      {moreInfo?.map(({ key, title, description }, index) => (
        <div
          className="flex flex-col space-y-2 border-t border-black py-2"
          onClick={() => {
            toggleAccordion(index);
          }}
          key={key}
        >
          <div className="text-sm font-medium flex items-center">
            <h6 className="flex-1">{title}</h6>
            <ChevronArrow
              className={clsx(
                "h-4 w-4",
                index === activeAccordionIndex ? "rotate-180" : ""
              )}
            />
          </div>
          {index === activeAccordionIndex && <p>{description}</p>}
        </div>
      ))}
    </div>
  );
};
