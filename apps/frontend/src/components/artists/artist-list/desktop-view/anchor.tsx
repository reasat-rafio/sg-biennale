import { convertSectionTypeName } from "@lib/helpers/global.helpers";
import useGlobalStore from "@stores/global.store";
import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/mousewheel";
import { Swiper as SwiperType, Mousewheel } from "swiper";
import { useEffect, useRef } from "react";

interface AnchorsProp {
  anchors: string[];
  activeAnchor: string;
  activeAnchorIndex: number;
}

export const Anchor: React.FC<AnchorsProp> = ({
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
        "sticky mt-28 h-min | bg-white rounded-[43px]",
        anchors.length && "py-10"
      )}
    >
      <Swiper
        style={{
          height:
            anchors.length < 5
              ? `${anchors.length * 50}px`
              : anchors.length < 10
              ? "40vh"
              : "70vh",
        }}
        modules={[Mousewheel]}
        spaceBetween={5}
        direction="vertical"
        slidesPerView={Math.min(anchors.length, 12)}
        autoHeight={true}
        mousewheel
        speed={200}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {anchors.map((anchor) => (
          <SwiperSlide key={anchor}>
            <span
              className={clsx(
                "font-manrope text-body-2 font-semibold | hover:text-red-love | cursor-pointer | transition-colors duration-500 ease-in-out  px-5",
                activeAnchor === anchor ? "text-red-love" : "text-gray--700"
              )}
              onClick={() => onAnchorClickAction(anchor)}
              key={anchor}
            >
              {anchor}
            </span>
          </SwiperSlide>
        ))}
      </Swiper>
    </aside>
  );
};
