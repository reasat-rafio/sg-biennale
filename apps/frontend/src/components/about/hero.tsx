import { Container } from "@components/ui/container";
import { Header } from "@components/ui/header";
import { Cta } from "@lib/@types/global.types";
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
  return (
    <Container type="section" className="py-section">
      <h1 className="pb-10 text-3xl font-medium">{header}</h1>
      <div className="grid grid-cols-12 | gap-5">
        <div className="col-span-12 lg:col-span-6">
          <Header>{subheader}</Header>
          <div className="text-lg">
            <PortableText blocks={description} />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6">
          <SanityImg
            className="w-full"
            builder={imageUrlBuilder}
            width={500}
            image={image}
            alt={subheader}
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row | lg:space-x-5 space-y-3 lg:space-y-0 my-5">
        {ctas.map(({ href, title, _key }) => (
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
