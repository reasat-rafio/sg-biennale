import { convertSectionTypeName } from "@lib/helpers/global.helpers";
import clsx from "clsx";

interface AnchorsProp {
  anchors: string[];
  activeAnchor: string;
}

export const Anchor: React.FC<AnchorsProp> = ({ anchors, activeAnchor }) => {
  const onAnchorClickAction = (anchorName: string) => {
    document
      ?.querySelector(`#anchor-${convertSectionTypeName(anchorName)}`)
      ?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="sticky mt-28 top-24 h-min | bg-white px-5 py-10 rounded-[43px]">
      <ul className="flex flex-col justify-center items-center space-y-5">
        {anchors.map((anchor) => (
          <li
            className={clsx(
              "font-manrope text-body-2 font-semibold | hover:text-red-love | cursor-pointer | transition-colors duration-500 ease-in-out",
              activeAnchor === anchor ? "text-red-love" : "text-gray--700"
            )}
            onClick={() => onAnchorClickAction(anchor)}
            key={anchor}
          >
            {anchor}
          </li>
        ))}
      </ul>
    </div>
  );
};
