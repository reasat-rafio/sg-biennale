import { Container } from "@components/ui/container";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  PublicationsAndCatalogue,
  PublicationCatalogue,
} from "./publication-catalogue";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar } from "swiper";
import { motion } from "framer-motion";

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
    <motion.section
      className="lg:pt-max pt-x"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <Container className="flex items-center | space-x-5">
        <h2 className="flex-1 | font-medium lg:text-heading-6 text-2xl text-gray--400">
          {header}
        </h2>
        <span className="font-medium lg:text-xl text-base text-gray--700 underline">
          View All
        </span>
      </Container>

      <div className="publicationCatalogueCarousel | xl:pl-max xl:px-0 sm:px-lg px-md my-10">
        <Swiper
          className="xl:pb-24 lg:pb-12 pb-2"
          modules={[Scrollbar]}
          speed={800}
          spaceBetween={30}
          scrollbar={{ draggable: true, dragSize: 100 }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 1,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 1.2,
              spaceBetween: 30,
            },
            1536: {
              slidesPerView: 1.7,
              spaceBetween: 100,
            },
          }}
        >
          {publicationsAndCatalogues.map((data) => (
            <SwiperSlide className="py-10" key={data._id}>
              <PublicationCatalogue {...data} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.section>
  );
};
