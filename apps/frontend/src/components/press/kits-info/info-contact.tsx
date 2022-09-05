import { useCallback, useState } from "react";
import { useWindowSize } from "@lib/hooks";
import clsx from "clsx";

export interface InfoAndContactsProps {
  title: string;
  infos: {
    _key?: string;
    label: string;
    value: string;
  }[];
}

export const InfoAndContacts: React.FC<InfoAndContactsProps> = ({
  infos,
  title,
}) => {
  const windowWidth = useWindowSize()?.width ?? 0;
  const [positionedAtRight, setPositionedAtRight] = useState(false);

  const containerRef = useCallback(
    (node: HTMLElement | null) => {
      if (node !== null) {
        node.getBoundingClientRect().left + 224 > windowWidth / 2
          ? setPositionedAtRight(true)
          : setPositionedAtRight(false);
      }
    },
    [windowWidth]
  );
  return (
    <div
      ref={containerRef}
      className={clsx(
        "row-span-2 | flex flex-col justify-center py-5 | space-y-4 | font-manrope",
        positionedAtRight ? "max-w-2xl" : "xl:pl-max"
      )}
    >
      <h6 className="text-body-1 font-semibold">{title}</h6>
      <ul>
        {infos.map(({ _key, label, value }) => (
          <li
            className="grid sm:grid-cols-2 grid-cols-1 | mt-2 | text-body-2"
            key={_key}
          >
            <span>{label}</span>
            <span>{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
