import { Container } from "@components/ui/container";
import { INewsProps } from "@lib/@types/home.types";
import { imageUrlBuilder, PortableText } from "@utils/sanity";
import { SanityImg } from "sanity-react-extra";
import { Header } from "@components/ui/header";
import { usePortableTextTruncate, useWindowSize } from "@lib/hooks";

interface NewsProps {
  type: string;
  news: INewsProps[];
  title: string;
}

export const News: React.FC<NewsProps> = ({ title, news }) => {
  return (
    <Container type="section" className="py-section | border-b-2 border-black">
      <Header type="h3">{title}</Header>

      <div className="grid grid-cols-12 | pt-5 lg:gap-10 gap-5">
        {news.map((newsData) => (
          <NewsCard key={newsData._id} {...newsData} />
        ))}
      </div>
    </Container>
  );
};

const NewsCard: React.FC<INewsProps> = ({ description, header, images }) => {
  const windowWidth = useWindowSize()?.width ?? 0;
  const [newsDescriptionRef] = usePortableTextTruncate({ maxLength: 800 });

  return (
    <div className="flex flex-col col-span-12 lg:col-span-6 | space-y-4">
      <div className="lg:h-[350px] h-auto">
        <SanityImg
          className="h-full w-full object-cover"
          height={windowWidth >= 768 ? 400 : 200}
          builder={imageUrlBuilder}
          image={images[0]}
          alt={`${header}`}
        />
      </div>
      <div ref={newsDescriptionRef}>
        <PortableText blocks={description} />
      </div>
    </div>
  );
};
