import { RelatedArtistsProps } from "@lib/@types/programmes-events-types";
import { useWindowSize } from "@lib/hooks";
import clsx from "clsx";
import Tooltip from "rc-tooltip";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "rc-tooltip/assets/bootstrap.css";

interface RelatedArtistsListProps {
  index: number;
  relatedArtists: RelatedArtistsProps[];
}

export const RelatedArtistsList: React.FC<RelatedArtistsListProps> = ({
  index,
  relatedArtists,
}) => {
  const artistRef = useRef<HTMLDivElement | null>(null);
  const windowWidth = useWindowSize()?.width ?? 0;

  const [artistsContainerWidth, setArtistsContainerWidth] = useState(0);
  const [totalArtistsWidth, setTotalArtistsWidth] = useState(0);
  const [showMoreArtistsLabelWidth, setShowMoreArtistsLabelWidth] = useState(0);
  const [overflownArtists, setOverflownArtists] = useState<null | string[]>([]);
  const [showToolTip, setShowToopTip] = useState(false);
  const [taskListNodes, setTaskListNodes] = useState<
    NodeListOf<HTMLElement> | []
  >([]);

  function calculateOverFlowingLabelsAction() {
    // GETTING THE MORE<NUMBER> LEBEL WIDTH
    const showMoreTasksLabelWidth =
      document.querySelector<HTMLElement>(`.show-more-${index}`)?.clientWidth ??
      0;
    setTotalArtistsWidth(0);

    // SUMMING THE WIDTH OF THE TASK ITEMS
    const alltaskList = document.querySelectorAll<HTMLElement>(
      `#related-artist-${index}`
    );
    alltaskList?.forEach((e) => {
      if (e.clientWidth) setTotalArtistsWidth((prev) => prev + e.clientWidth);
    });

    setTaskListNodes(alltaskList);
    setShowMoreArtistsLabelWidth(showMoreTasksLabelWidth);
    setArtistsContainerWidth(artistRef?.current?.clientWidth ?? 0);
  }

  useLayoutEffect(() => {
    calculateOverFlowingLabelsAction();
    window.addEventListener("resize", calculateOverFlowingLabelsAction);
    return () =>
      window.removeEventListener("resize", calculateOverFlowingLabelsAction);
  }, [artistRef?.current, setTotalArtistsWidth, overflownArtists]);

  useEffect(() => {
    let index = 0;
    let sum = showMoreArtistsLabelWidth;

    if (taskListNodes.length > 0) {
      if (totalArtistsWidth >= artistsContainerWidth - 80) {
        setOverflownArtists([]);

        for (let i = 0; i <= taskListNodes.length; i++) {
          if (sum < artistsContainerWidth - 80) {
            sum = sum + taskListNodes[i]?.clientWidth;
          } else {
            index = i - 1;
            break;
          }
        }
        taskListNodes.forEach((e: HTMLElement, idx: number) => {
          if (idx >= index) {
            setOverflownArtists((prev) => [...(prev as string[]), e.innerHTML]);
            e.style.visibility = "hidden";
            e.style.position = "absolute";
          } else {
            setOverflownArtists((prev) => [...(prev as string[])]);
            e.style.visibility = "visible";
            e.style.position = "relative";
          }
        });
      } else {
        taskListNodes.forEach((e: HTMLElement) => {
          setOverflownArtists([]);
          e.style.visibility = "visible";
          e.style.position = "relative";
        });
      }
    }
  }, [
    taskListNodes.length,
    windowWidth,
    showMoreArtistsLabelWidth,
    overflownArtists,
  ]);

  return (
    <div
      className="overflow-visible flex-nowrap flex whitespace-nowrap space-x-3 relative w-full "
      ref={artistRef}
      onClick={(e) => e.stopPropagation()}
    >
      {relatedArtists.map(({ name, _id }) => (
        <span key={_id} id={`related-artist-${index}`} className="text-white">
          {name}
        </span>
      ))}

      <Tooltip
        placement="topLeft"
        visible={showToolTip}
        onVisibleChange={() => setShowToopTip((prev) => !prev)}
        trigger="click"
        overlayInnerStyle={{
          background: "#0D0E14",
          border: "1px solid #1E2531",
          opacity: "1",
          color: "white",
        }}
        overlay={
          <span className="">
            {overflownArtists?.map((e: string, idx: number) =>
              idx === overflownArtists.length - 1 ? e : `${e}, `
            )}
          </span>
        }
      >
        <span
          className={clsx(
            `text-white show-more-${index}`,
            overflownArtists?.length ? "visible" : "invisible"
          )}
        >
          + {overflownArtists?.length} More
        </span>
      </Tooltip>
    </div>
  );
};
