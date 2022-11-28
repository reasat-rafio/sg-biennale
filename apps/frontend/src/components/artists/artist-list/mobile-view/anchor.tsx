import { convertSectionTypeName } from "@lib/helpers/global.helpers";
import useGlobalStore from "@stores/global.store";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";

interface AnchorProps {
  anchors: string[];
  activeAnchor: string;
  activeAnchorIndex: number;
}

export const Anchor: React.FC<AnchorProps> = ({
  anchors,
  activeAnchor,
  activeAnchorIndex,
}) => {
  const { navbarHeight } = useGlobalStore();
  const swiperRef = useRef<SwiperType>();

  const onAnchorClickAction = (anchorName: string) => {
    document
      ?.querySelector(`#anchor-${convertSectionTypeName(anchorName)}`)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (swiperRef.current) swiperRef.current.slideTo(activeAnchorIndex);
  }, [activeAnchorIndex, swiperRef.current]);

  return (
    <aside
      style={{ top: navbarHeight + 5 }}
      className={clsx(
        "z-10 sticky mt-28 h-min | bg-white px-5 rounded-[43px] shadow",
        anchors.length && "py-3"
      )}
    >
      <Swiper
        className="px-5"
        spaceBetween={5}
        slidesPerView={Math.min(anchors.length, 12)}
        scrollbar={{ draggable: true }}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {anchors.map((anchor) => (
          <SwiperSlide key={anchor}>
            <span
              className={clsx(
                "font-manrope text-body-2 font-semibold | hover:text-red-love | cursor-pointer | transition-colors duration-500 ease-in-out",
                activeAnchor === anchor ? "text-red-love" : "text-gray--700"
              )}
              onClick={() => onAnchorClickAction(anchor)}
            >
              {anchor}
            </span>
          </SwiperSlide>
        ))}
      </Swiper>
    </aside>
  );
};
