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
    <Container type="section" className="">
      <Header type="h1">{header}</Header>
      <div className="flex flex-col | my-7 lg:gap-8 gap-4">
        {releases.map((data) => (
          <article key={data._id} className=""></article>
        ))}
      </div>
    </Container>
  );
};
