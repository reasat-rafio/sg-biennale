import { Container } from "@components/ui/container";
import { Header } from "@components/ui/header";
import { IArtistProps } from "@lib/@types/home.types";
import { usePortableTextTruncate, useWindowSize } from "@lib/hooks";
import { imageUrlBuilder, PortableText } from "@utils/sanity";
import Link from "next/link";
import { SanityImg } from "sanity-react-extra";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Mousewheel, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/mousewheel";
import "swiper/css/pagination";
import { useState } from "react";

interface ArtistProps {
  type: string;
  artists: IArtistProps[];
  title: string;
}

export const Artist: React.FC<ArtistProps> = ({ title, artists }) => {
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

  return (
    <Container className="py-section" type="section">
      <Header type="h3">{title}</Header>

      <Swiper
        loop
        grabCursor
        speed={600}
        className="pb-14"
        loopedSlides={artists.length}
        navigation={{ prevEl, nextEl }}
        autoplay={{ disableOnInteraction: false, delay: 6000 }}
        modules={[Autoplay, Navigation, Mousewheel, Pagination]}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
      >
        {artists.map((artistData) => (
          <SwiperSlide key={artistData._id}>
            <ArtistCard key={artistData._id} {...artistData} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

const ArtistCard: React.FC<IArtistProps> = ({
  description,
  images,
  name,
  slug,
}) => {
  const windowWidth = useWindowSize()?.width ?? 0;

  const [artistDescriptionRef] = usePortableTextTruncate({
    maxLength: 400,
  });

  return (
    <article>
      {/*lg:h-[305px] h-auto */}
      <figure>
        {/* <SanityImg
          className="w-full h-full object-cover"
          height={windowWidth >= 768 ? 400 : 200}
          builder={imageUrlBuilder}
          image={images[0]}
          alt={`${name}'s image`}
        /> */}
      </figure>
      <section className="flex flex-col space-y-3">
        <h6 className="text-lg font-medium">{name}</h6>
        <div ref={artistDescriptionRef}>
          <PortableText blocks={description} />
        </div>
        <Link href={`/artists/${slug.current}`}>
          <a className="font-medium">Read More</a>
        </Link>
      </section>
    </article>
  );
};
