import { convertSectionTypeName } from "@lib/helpers/global.helpers";
import useGlobalStore from "@stores/global.store";
import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface AnchorsProp {
  anchors: string[];
  activeAnchor: string;
}

export const Anchor: React.FC<AnchorsProp> = ({ anchors, activeAnchor }) => {
  const { navbarHeight } = useGlobalStore();
  const onAnchorClickAction = (anchorName: string) => {
    document
      ?.querySelector(`#anchor-${convertSectionTypeName(anchorName)}`)
      ?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <aside
      style={{ top: navbarHeight + 5 }}
      className="sticky mt-28 h-min | bg-white px-5 py-10 rounded-[43px]"
    >
      <Swiper
        className={clsx(
          anchors.length < 5
            ? "h-[30vh]"
            : anchors.length < 10
            ? "h-[40vh]"
            : "h-[70vh]"
        )}
        spaceBetween={5}
        direction="vertical"
        slidesPerView={Math.min(anchors.length, 12)}
        autoHeight={true}
        scrollbar={{ draggable: true }}
      >
        {anchors.map((anchor) => (
          <SwiperSlide>
            <span
              className={clsx(
                "font-manrope text-body-2 font-semibold | hover:text-red-love | cursor-pointer | transition-colors duration-500 ease-in-out",
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
