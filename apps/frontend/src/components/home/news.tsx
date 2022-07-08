import { useCallback, useEffect, useRef } from "react";
import { Container } from "@components/ui/container";
import { INewsProps } from "@lib/@types/home.types";
import { doTruncate } from "@lib/helpers";
import { imageUrlBuilder, PortableText } from "@utils/sanity";
import { SanityImg } from "sanity-react-extra";
import { Header } from "@components/ui/header";

interface NewsProps {
  type: string;
  news: INewsProps[];
  title: string;
}

export const News: React.FC<NewsProps> = ({ title, news }) => {
  return (
    <Container type="section" className="py-section | border-y-2 border-black">
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
  const newsDescriptionRef = useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      const newsDescriptionRefChilds = node.children;
      newsDescriptionRefChilds[0].innerHTML = `${doTruncate(
        newsDescriptionRefChilds[0].textContent as string,
        800
      )} ...`;
    }
  }, []);

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