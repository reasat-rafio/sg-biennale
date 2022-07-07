import { useEffect, useRef } from "react";
import { Container } from "@components/ui/container";
import { INewsProps } from "@lib/@types/home.types";
import { doTruncate } from "@lib/helpers";
import { imageUrlBuilder, PortableText } from "@utils/sanity";
import { SanityImg } from "sanity-react-extra";

interface NewsProps {
  type: string;
  news: INewsProps[];
  title: string;
}

export const News: React.FC<NewsProps> = ({ title, news }) => {
  return (
    <Container type="section" className="py-5 | border-y-2 border-black">
      <h3 className="pb-3 | text-2xl font-medium">{title}</h3>

      <div className="grid grid-cols-12 | lg:gap-10 gap-5">
        {news.map((newsData) => (
          <NewsCard key={newsData._id} {...newsData} />
        ))}
      </div>
    </Container>
  );
};

const NewsCard: React.FC<INewsProps> = ({ description, header, images }) => {
  const newsDescriptionRef = useRef<HTMLDivElement | null>(null);
  const newsDescriptionRefChilds = newsDescriptionRef.current?.children;

  useEffect(() => {
    if (newsDescriptionRefChilds?.length)
      newsDescriptionRefChilds[0].innerHTML = `${doTruncate(
        newsDescriptionRefChilds[0].textContent as string,
        800
      )} ...`;
  }, [newsDescriptionRefChilds]);

  return (
    <div className="flex flex-col col-span-12 lg:col-span-6 | space-y-4">
      <div>
        <SanityImg
          className="h-full w-full"
          height={400}
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
