import { Container } from "@components/ui/container";
import { useEffect, useState } from "react";
import { sliceIntoChunks } from "@lib/helpers/global.helpers";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar } from "swiper";

interface DirectoryOfTermProps {
  type: string;
  directors: string[];
  header: string;
}
interface SortedDirectorsList {
  title: string;
  data: string[];
}
export const DirectoryOfTerm: React.FC<DirectoryOfTermProps> = ({
  header,
  directors,
}) => {
  const [sortedDirectors, setSortedDirectors] = useState<
    SortedDirectorsList[][]
  >([]);

  useEffect(() => {
    const newSortedDirectorsListWithTitleAsFirstLatter: SortedDirectorsList[] =
      Object.values(
        directors.reduce((newVal: any, director) => {
          let firstLetter = director[0].toLocaleUpperCase();

          !newVal[firstLetter]
            ? (newVal[firstLetter] = { title: firstLetter, data: [director] })
            : newVal[firstLetter].data.push(director);

          return newVal;
        }, {})
      );
    const alphabeticalSorting =
      newSortedDirectorsListWithTitleAsFirstLatter.sort((a, b) =>
        a.title > b.title ? 1 : -1
      );
    const result = sliceIntoChunks(alphabeticalSorting, 2);
    setSortedDirectors(result);
  }, [directors]);

  return (
    <Container className="py-max bg-[#F8F8F8] space-y-10">
      <header>
        <h2 className="max-w-xs | font-medium text-heading-4">{header}</h2>
      </header>

      <div className="">
        <Swiper
          className="directorsCarousel | pb-10"
          modules={[Scrollbar]}
          speed={1000}
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
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
        >
          {sortedDirectors.map((director, index) => (
            <SwiperSlide key={director[0].title + index}>
              <div className="mb-10">
                {director.map(({ data, title }) => (
                  <div className="space-y-6 mb-10 min-h-[300px]" key={title}>
                    <span className="text-2xl font-medium">{title}</span>
                    <ul className="flex flex-col space-y-2">
                      {data.map((d) => (
                        <li className="text-body-1 text-gray--700 font-manrope">
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Container>
  );
};
