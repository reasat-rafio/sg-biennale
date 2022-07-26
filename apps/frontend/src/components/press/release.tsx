import { Container } from "@components/ui/container";
import { Header } from "@components/ui/header";
import { Cta, Slug } from "@lib/@types/global.types";
import { doTruncate } from "@lib/helpers/global.helpers";
import { usePortableTextTruncate, useWindowSize } from "@lib/hooks";
import { imageUrlBuilder, PortableText } from "@utils/sanity";
import Link from "next/link";
import { useCallback } from "react";
import { SanityImage, SanityImg } from "sanity-react-extra";

interface ReleaseProps {
  header: string;
  releases: {
    _id: string;
    header: string;
    description: any[];
    images: SanityImage[];
    slug: Slug;
    cta: Cta;
    file?: any;
  }[];
}

export const Release: React.FC<ReleaseProps> = ({ header, releases }) => {
  const windowWidth = useWindowSize()?.width ?? 0;

  const [descriptionRef] = usePortableTextTruncate({ maxLength: 400 });

  return (
    <Container type="section" className="py-section | border-b-2 border-black">
      <Header type="h1">{header}</Header>
      <div className="grid grid-cols-12 | my-7 lg:gap-8 gap-4">
        {releases.map((data) => (
          <div
            key={data._id}
            className="flex flex-col | col-span-12 lg:col-span-6 | space-y-1"
          >
            <div>
              <SanityImg
                width={windowWidth >= 768 ? 900 : 500}
                className="w-full max-h-[400px] object-cover"
                image={data.images[0]}
                builder={imageUrlBuilder}
                alt={header + "'s image"}
              />
            </div>
            <div className="flex flex-col | space-y-5">
              <h6 className="text-xl font-semibold | pt-2">{data.header}</h6>
              <div className="text-lg" ref={descriptionRef}>
                <PortableText blocks={data.description} />
              </div>
              <Link href={data.cta?.href ?? ""}>
                <a
                  onClick={(event) => {
                    if (data?.file) {
                      event.preventDefault();
                      window.open(data?.file.asset.url);
                    }
                  }}
                  target="_blank"
                  className="text-lg font-medium"
                >
                  {data.cta.title}
                </a>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};
