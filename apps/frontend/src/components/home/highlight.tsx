import "swiper/css";
import "swiper/css/scrollbar";
import { IArtistProps } from "@lib/@types/home.types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper";
import { Container } from "@components/ui/container";
import { Header } from "@components/ui/header";
import { SanityImg } from "sanity-react-extra";
import { imageUrlBuilder } from "@utils/sanity";
import { useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { useWindowSize } from "@lib/hooks";

interface HighLightProps {
  type: string;
  artists: IArtistProps[];
  title: string;
}

export const HighLight: React.FC<HighLightProps> = ({ title, artists }) => {
  const windowWidth = useWindowSize()?.width ?? 0;
  const [activeHighlight, setActivehighlightCard] = useState<number | null>(
    null
  );
  const clickOnCardAction = (index: number) =>
    setActivehighlightCard((prev) => (prev === index ? null : index));

  return (
    <section>
      <Container>
        <Header>{title}</Header>
      </Container>

      <div className="highlightCarousel py-xl">
        <Swiper
          grabCursor
          className="py-xl lg:pl-[20%]"
          modules={[Scrollbar]}
          scrollbar={{ draggable: true, dragSize: 100 }}
          speed={1000}
          slidesPerView="auto"
        >
          {artists.map(({ _id, images, name, countries, slug }, index) => (
            <SwiperSlide
              key={_id}
              onClick={() => clickOnCardAction(index)}
              className={clsx(
                "relative aspect-square | transition-all duration-700 ease-in-out",
                index === activeHighlight
                  ? "xl:w-[45%] sm:w-[55%] w-[100%] xl:-translate-y-[12%] sm:-translate-y-[10%] | sm:px-5 | will-change-transform"
                  : "xl:w-[35%] sm:w-[45%] w-[100%] | px-3"
              )}
            >
              <figure className="h-full w-full overflow-hidden">
                <SanityImg
                  className={clsx(
                    "h-full w-full object-cover aspect-square | transition-transform duration-500 ease-in-out | will-change-transform",
                    index === activeHighlight ? "scale-110" : "scale-100"
                  )}
                  image={images[0]}
                  builder={imageUrlBuilder}
                  height={
                    windowWidth >= 1024 ? 400 : windowWidth >= 640 ? 250 : 120
                  }
                  alt={name}
                />
              </figure>
              <section
                className="absolute top-1/2 left-1/2 -translate-x-1/2 | text-white hover:scale-105 | cursor-pointer | transition-transform duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <Link href={`/artists/${slug.current}`}>
                  <a>
                    <h6 className="font-bold lg:text-[24px] text-base">
                      {name}
                    </h6>
                    <span className="">
                      {countries.map(({ label }, index) => (
                        <span key={label}>
                          {label}
                          {index === countries.length - 1 ? "" : ","}
                        </span>
                      ))}
                    </span>
                  </a>
                </Link>
              </section>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
