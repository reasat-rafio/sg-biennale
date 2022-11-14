import { RelatedArtistsProps } from "@lib/@types/programmes-events.types";
import { useWindowSize } from "@lib/hooks";
import clsx from "clsx";
import Tooltip from "rc-tooltip";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const overflownNodesContainerRef = useRef<HTMLDivElement | null>(null);
  const containerNodeRef = useRef<HTMLUListElement | null>(null);

  const windowWidth = useWindowSize()?.width ?? 0;

  const [_index, setIndex] = useState(0);
  const [artistsContainerWidth, setArtistsContainerWidth] = useState(0);
  const [totalNodesWidth, setTotalNodesWidth] = useState(0);
  const [showMoreArtistsLabelWidth, setShowMoreArtistsLabelWidth] = useState(0);
  const [showToolTip, setShowToopTip] = useState(false);

  //
  const [sectionWidth, setSectionWidth] = useState(0);
  const [contaienrNodeWidth, setContaienrNodeWidth] = useState(0);
  const [overflowNodes, setOverflownNodes] = useState<null | string[]>([]);
  const [overflownNodesContainerWidth, setOverflownNodesContainerWidth] =
    useState(0);
  const [nodes, setNodes] = useState<NodeListOf<HTMLLIElement> | null>(null);

  useLayoutEffect(() => {
    setTotalNodesWidth(0);
    setSectionWidth(sectionRef?.current?.clientWidth ?? 0);
    setContaienrNodeWidth(containerNodeRef?.current?.clientWidth ?? 0);

    const allNodes: NodeListOf<HTMLLIElement> = containerNodeRef.current
      ?.childNodes as NodeListOf<HTMLLIElement>;

    setNodes(allNodes);

    allNodes?.forEach((node) =>
      setTotalNodesWidth(
        (prevWidth) => prevWidth + node.getBoundingClientRect().width
      )
    );
  }, [sectionRef?.current, containerNodeRef?.current]);

  useLayoutEffect(() => {
    setOverflownNodesContainerWidth(
      overflownNodesContainerRef?.current?.clientWidth ?? 0
    );
  }, [overflownNodesContainerRef?.current, windowWidth]);

  useEffect(() => {
    let sum = showMoreArtistsLabelWidth;

    if (Boolean(nodes?.length ?? -1 > 0)) {
      if (totalNodesWidth >= contaienrNodeWidth - 80) {
        setOverflownNodes([]);
      }
    }
  }, [nodes, totalNodesWidth, contaienrNodeWidth]);

  // useEffect(
  //   () => {
  //     let index = 0;
  //     let sum = showMoreArtistsLabelWidth;

  //     if (taskListNodes.length > 0) {
  //       if (totalNodesWidth >= artistsContainerWidth - 80) {
  //         setOverflownNodes([]);

  //         for (let i = 0; i <= taskListNodes.length; i++) {
  //           if (sum < artistsContainerWidth - 80) {
  //             sum = sum + taskListNodes[i]?.clientWidth;
  //           } else {
  //             index = i - 1;
  //             break;
  //           }
  //         }
  //         taskListNodes.forEach((e: HTMLElement, idx: number) => {
  //           if (idx >= index) {
  //             setOverflownNodes((prev) => [
  //               ...(prev as string[]),
  //               e.innerHTML,
  //             ]);
  //             e.style.visibility = "hidden";
  //             e.style.position = "absolute";
  //           } else {
  //             setOverflownNodes((prev) => [...(prev as string[])]);
  //             e.style.visibility = "visible";
  //             e.style.position = "relative";
  //           }
  //         });
  //       } else {
  //         taskListNodes.forEach((e: HTMLElement) => {
  //           setOverflownNodes([]);
  //           e.style.visibility = "visible";
  //           e.style.position = "relative";
  //         });
  //       }
  //     }
  //   },
  //   [
  //     // taskListNodes.length,
  //     // windowWidth,
  //     // showMoreArtistsLabelWidth,
  //     // overflownArtists,
  //   ]
  // );

  return (
    <div
      className="relative overflow-visible items-center w-full flex-nowrap flex whitespace-nowrap | space-x-3 | font-semibold font-manrope text-body-2 text-white"
      ref={sectionRef}
      onClick={(e) => e.stopPropagation()}
    >
      <UserIcon />
      <ul ref={containerNodeRef}>
        {relatedArtists?.map(({ name, _id }, idx) => (
          <li className="" key={_id + idx}>
            {name}
          </li>
        ))}
      </ul>

      {/* <Tooltip
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
            {overflownArtists?.map((e: string, idx: number) => (
              <span
                key={e + idx}
                className="text-white text-body-2 font-semibold"
              >
                {e},{" "}
              </span>
            ))}
          </>
        }
      >
        <span
          ref={overflownNodesContainerRef}
          className={clsx(
            `text-white text-body-2 cursor-pointer`,
            overflownArtists?.length ? "visible" : "invisible"
          )}
        >
          and + {overflownArtists?.length} More
        </span>
      </Tooltip> */}
    </div>
  );
};
