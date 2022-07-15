import { Container } from "@components/ui/container";
import { Header } from "@components/ui/header";
import { Slug } from "@lib/@types/global.types";
import { doTruncate } from "@lib/helpers";
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
  }[];
}

export const Release: React.FC<ReleaseProps> = ({ header, releases }) => {
  const descriptionRef = useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      const descriptionRefChilds = node.children;
      descriptionRefChilds[0].innerHTML = `${doTruncate(
        descriptionRefChilds[0].textContent as string,
        800
      )} ...`;
    }
  }, []);

  return (
    <Container type="section" className="py-section | border-b-2 border-black">
      <Header type="h1">{header}</Header>
      <div className="grid grid-cols-12 | mt-7 lg:gap-8 gap-4">
        {releases.map((data) => (
          <div
            key={data._id}
            className="flex flex-col | col-span-12 lg:col-span-6 | space-y-1"
          >
            <div>
              <SanityImg
                width={500}
                className="w-full max-h-[400px] object-cover"
                image={data.images[0]}
                builder={imageUrlBuilder}
                alt={header + "'s image"}
              />
            </div>
            <div className="flex flex-col | space-y-5">
              <h6 className="text-xl font-medium">{data.header}</h6>
              <div ref={descriptionRef}>
                <PortableText blocks={data.description} />
              </div>
              <Link href={`/news/${data.slug.current}`}>
                <a className="text-lg font-medium">Read More</a>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center | my-7">
        <button className="px-4 py-1 | border-black border-2 | rounded-3xl">
          Archive
        </button>
      </div>
    </Container>
  );
};
