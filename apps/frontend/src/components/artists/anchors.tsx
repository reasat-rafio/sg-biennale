import { convertSectionTypeName } from "@lib/helpers/global.helpers";

interface AnchorsProps {
  anchors: string[];
}

export const Anchors: React.FC<AnchorsProps> = ({ anchors }) => {
  const onAnchorClickAction = (anchorName: string) => {
    document
      ?.querySelector(`#anchor-${convertSectionTypeName(anchorName)}`)
      ?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
      <ul>
        {anchors.map((anchor) => (
          <li onClick={() => onAnchorClickAction(anchor)} key={anchor}>
            {anchor}
          </li>
        ))}
      </ul>
    </div>
  );
};
