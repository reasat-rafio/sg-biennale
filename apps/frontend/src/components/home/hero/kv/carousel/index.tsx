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
  randomizeKV: boolean;
}

export const Carousel: React.FC<HeroCarouselProps> = ({ kvs, randomizeKV }) => {
  const [suffledKVs, setSuffledKVs] = useState<SanityImage[]>([]);
  const windowWidth = useWindowSize()?.width ?? 0;

  useEffect(() => {
    if (randomizeKV) setSuffledKVs(getShuffledArr(kvs));
  }, [randomizeKV]);

  return (
    <div className="sm:mt-x">
      {windowWidth >= 768 ? (
        <Desktop kvs={randomizeKV ? suffledKVs : kvs} />
      ) : (
        <Mobile kvs={randomizeKV ? suffledKVs : kvs} />
      )}
    </div>
  );
};
