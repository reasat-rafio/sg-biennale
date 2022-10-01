import { convertSectionTypeName } from "@lib/helpers/global.helpers";
import useGlobalStore from "@stores/global.store";
import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";

interface AnchorProps {
  anchors: string[];
  activeAnchor: string;
}

export const Anchor: React.FC<AnchorProps> = ({ activeAnchor, anchors }) => {
  const { navbarHeight } = useGlobalStore();
  const onAnchorClickAction = (anchorName: string) => {
    document
      ?.querySelector(`#anchor-${convertSectionTypeName(anchorName)}`)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <aside
      style={{ top: navbarHeight }}
      className="z-10 sticky mt-28 h-min | bg-white px-5 py-3 rounded-[43px] shadow"
    >
      <Swiper
        className="px-5"
        spaceBetween={5}
        slidesPerView={Math.min(anchors.length, 12)}
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
