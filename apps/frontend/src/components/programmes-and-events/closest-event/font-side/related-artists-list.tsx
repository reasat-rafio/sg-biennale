import { RelatedArtistsProps } from "@lib/@types/programmes-events-types";
import { useWindowSize } from "@lib/hooks";
import clsx from "clsx";
import Tooltip from "rc-tooltip";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "rc-tooltip/assets/bootstrap.css";
import { UserIcon } from "@components/icons/user";

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
      className="relative overflow-visible items-center w-full flex-nowrap flex whitespace-nowrap | space-x-3 | font-semibold font-manrope text-body-2 text-white"
      ref={artistRef}
      onClick={(e) => e.stopPropagation()}
    >
      <UserIcon />
      {relatedArtists.map(({ name, _id }, idx) => (
        <span className="" key={_id} id={`related-artist-${index}`}>
          {name}
        </span>
      ))}

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
        }}
        overlay={
          <>
            {overflownArtists?.map((e: string, idx: number) => (
              <span className="text-white text-body-2 font-semibold">
                {e},{" "}
              </span>
            ))}
          </>
        }
      >
        <span
          className={clsx(
            `text-white text-body-2 cursor-pointer show-more-${index}`,
            overflownArtists?.length ? "visible" : "invisible"
          )}
        >
          and + {overflownArtists?.length} More
        </span>
      </Tooltip>
    </div>
  );
};
