import { RelatedArtistsProps } from "@lib/@types/programmes-events.types";
import { useWindowSize } from "@lib/hooks";
import clsx from "clsx";
import Tooltip from "rc-tooltip";
import { useEffect, useRef, useState } from "react";
import "rc-tooltip/assets/bootstrap.css";
import { UserIcon } from "@components/icons/user";

interface RelatedArtistsListProps {
  index: number;
  relatedArtists: RelatedArtistsProps[];
}

export const RelatedArtistsList: React.FC<RelatedArtistsListProps> = ({
  relatedArtists,
}) => {
  const nodeRef = useRef<HTMLUListElement>(null);
  const windowWidth = useWindowSize()?.width ?? 0;
  const [showToolTip, setShowToopTip] = useState(false);
  const [firstOverflownIndex, setFirstOverFlownIndex] = useState<number | null>(
    null
  );
  const [overflownItems, setOverflownItems] = useState<RelatedArtistsProps[]>(
    []
  );

  const isWrapping = (previous: Element, current: Element) =>
    previous.getBoundingClientRect().top !==
    current.getBoundingClientRect().top;

  const highlightWrappingElements = (element: HTMLUListElement) => {
    for (let i = 1; i < element.children.length; ++i) {
      const previous = element.children[i - 1];
      const current = element.children[i];

      if (isWrapping(previous, current)) {
        setFirstOverFlownIndex(i);
        break;
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (nodeRef?.current) {
        highlightWrappingElements(nodeRef.current);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [nodeRef?.current, windowWidth, setFirstOverFlownIndex]);

  useEffect(() => {
    if (firstOverflownIndex)
      setOverflownItems(
        relatedArtists.slice(firstOverflownIndex, relatedArtists.length)
      );
  }, [firstOverflownIndex]);

  return (
    <div
      className="relative flex items-center space-x-2 | mr-5 | font-semibold font-manrope text-body-2 text-white"
      onClick={(e) => e.stopPropagation()}
    >
      <UserIcon />
      <div className="flex">
        <ul
          ref={nodeRef}
          className={clsx(
            "relative flex | flex-wrap overflow-hidden space-x-2 max-h-[20px]"
          )}
        >
          {relatedArtists.map(({ name, _id }, idx) => (
            <li className="p-0" key={_id + idx}>
              {name}
            </li>
          ))}
        </ul>

        <Tooltip
          placement="topLeft"
          visible={showToolTip}
          onVisibleChange={() => setShowToopTip((prev) => !prev)}
          trigger="click"
          overlayInnerStyle={{
            background: "#000000",
            border: "1px solid #1E2531",
            opacity: "1",
            color: "white",
            maxWidth: 400,
          }}
          overlay={
            <>
              {overflownItems?.map(({ name, _id }, idx: number) => (
                <span
                  key={_id + idx}
                  className="text-white text-body-2 font-semibold"
                >
                  {name},{" "}
                </span>
              ))}
            </>
          }
        >
          <span
            onClick={(e) => e.stopPropagation()}
            className={clsx(
              `text-white text-body-2 cursor-pointer w-full`,
              overflownItems?.length ? "visible" : "invisible"
            )}
          >
            and + {overflownItems?.length} More
          </span>
        </Tooltip>
      </div>
    </div>
  );
};
