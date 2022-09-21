import { Container } from "@components/ui/container";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  PublicationsAndCatalogue,
  PublicationCatalogue,
} from "./publication-catalogue";

interface PublicationCatalogueProps {
  type: string;
  header: string;
  publicationsAndCatalogues: PublicationsAndCatalogue[];
}

export const PublicationsCatalogues: React.FC<PublicationCatalogueProps> = ({
  header,
  publicationsAndCatalogues,
}) => {
  return (
    <section className="py-max">
      <Container className="flex items-center | space-x-5">
        <h2 className="flex-1 | font-medium lg:text-heading-6 text-2xl text-gray--400">
          {header}
        </h2>
        <span className="font-medium lg:text-xl text-base text-gray--700 underline">
          View All
        </span>
      </Container>

      <div className="xl:pl-max my-10">
        <Swiper
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 1.4,
              spaceBetween: 30,
            },
          }}
        >
          {publicationsAndCatalogues.map((data) => (
            <SwiperSlide className="py-10" key={data._key}>
              <PublicationCatalogue {...data} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
