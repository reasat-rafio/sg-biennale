import { Container } from "@components/ui/container";
import { Header } from "@components/ui/title";
import { Cta } from "@lib/@types/global.types";
import { useWindowSize } from "@lib/hooks";
import { imageUrlBuilder, PortableText } from "@utils/sanity";
import Link from "next/link";
import { SanityImage, SanityImg } from "sanity-react-extra";

interface HeroProps {
  type: string;
  ctas: Cta[];
  description: any[];
  header: string;
  image: SanityImage;
  subheader: string;
}

export const Hero: React.FC<HeroProps> = ({
  header,
  subheader,
  description,
  ctas,
  image,
}) => {
  const windowWidth = useWindowSize()?.width ?? 0;

  return (
    <Container type="section" className="py-section">
      <h1 className="pb-10 text-3xl font-medium">{header}</h1>
      <article className="grid grid-cols-12 | gap-5">
        <section className="col-span-12 lg:col-span-6">
          <Header>{subheader}</Header>
          <div className="text-lg">
            <PortableText blocks={description} />
          </div>
        </section>

        <figure className="col-span-12 lg:col-span-6 | overflow-hidden">
          <SanityImg
            className="w-full max-h-[500px] object-contain"
            builder={imageUrlBuilder}
            width={windowWidth >= 768 ? 900 : 500}
            image={image}
            alt={subheader}
          />

          <figcaption className="text-center mt-3">{image.caption}</figcaption>
        </figure>
      </article>
      <div className="flex flex-col lg:flex-row | lg:space-x-5 space-y-3 lg:space-y-0 my-5">
        {ctas?.map(({ href, title, _key }) => (
          <Link key={_key} href={href}>
            <a className="flex-1 | py-2 px-4 | border-black border-2 | text-center | rounded-3xl">
              {title}
            </a>
          </Link>
        ))}
      </div>
    </Container>
  );
};
