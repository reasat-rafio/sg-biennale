import "swiper/css";
import "swiper/css/autoplay";
import { useWindowSize } from "@lib/hooks";
import { useEffect, useState } from "react";
import { getShuffledArr } from "@lib/helpers/global.helpers";
import { SanityImage } from "sanity-react-extra";
import { Desktop } from "./desktop";
import { Mobile } from "./mobile";

interface HeroCarouselProps {
  kvs: SanityImage[];
}

export const Carousel: React.FC<HeroCarouselProps> = ({ kvs }) => {
  const [suffledKVs, setSuffledKVs] = useState<SanityImage[]>([]);
  const windowWidth = useWindowSize()?.width ?? 0;

  useEffect(() => {
    setSuffledKVs(getShuffledArr(kvs));
  }, []);

  return (
    <>
      {windowWidth >= 1024 ? <Desktop suffledKVs={suffledKVs} /> : <Mobile />}
    </>
  );
};
