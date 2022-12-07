import { Anchor } from "@components/ui/anchor";
import { Button } from "@components/ui/button";
import { Container } from "@components/ui/container";
import { Cta } from "@lib/@types/global.types";
import { InformationProps } from "@lib/@types/venue-details";
import { useWindowSize } from "@lib/hooks";
import { imageUrlBuilder, PortableText } from "@utils/sanity";
import { SanityImage, SanityImg } from "sanity-react-extra";

interface HeroProps {
  name: string;
  image: SanityImage;
  informations: InformationProps[];
  cta?: Cta;
}

export const Hero: React.FC<HeroProps> = ({
  image,
  informations,
  name,
  cta,
}) => {
  const windowWidth = useWindowSize()?.width ?? 0;

  return (
    <Container className="flex flex-col | space-y-7 md:mt-xl mt-x">
      <Anchor href="/visitor-info" className="text-gray--700">
        Back to Visitor Info
      </Anchor>
      <Header name={name} cta={cta} />

      <section className="grid grid-cols-12 gap-5">
        <figure className="xl:col-span-7 md:col-span-6 col-span-12">
          <SanityImg
            className="h-full w-full object-cover"
            image={image}
            builder={imageUrlBuilder}
            width={windowWidth >= 1280 ? 600 : windowWidth >= 768 ? 400 : 200}
            alt={name}
          />
        </figure>
        <div className="xl:col-span-5 md:col-span-6 col-span-12 h-min | px-5 rounded | divide-y-2 bg-gray--100 divide-[#CCCCCC]">
          {informations.map((props) => (
            <Information key={props._key} {...props} />
          ))}
        </div>
      </section>
    </Container>
  );
};

const Header: React.FC<{ name: string; cta: Cta }> = ({ name, cta }) => {
  return (
    <div className="flex md:flex-row flex-col | items-center md:space-x-5 md:space-y-0 space-y-5">
      <header className="flex-1">
        <h1 className="2xl:text-heading-3 xl:text-heading-4 text-heading-5 font-medium md:text-left text-center">
          {name}
        </h1>
      </header>
      {cta && (
        <Button type="href" href={cta.href} variant="secondary">
          {cta.title}
        </Button>
      )}
    </div>
  );
};

const Information: React.FC<InformationProps> = ({ _key, title, infos }) => {
  return (
    <div
      key={_key}
      className="flex flex-col space-y-4 | py-10 | font-manrope text-body-2"
    >
      <div className="text-gray--700">{title}</div>
      <div className="grid grid-cols-12 gap-x-5 gap-y-3">
        {infos.map(({ _key, type, value }) => (
          <div
            key={_key}
            className="lg:col-span-6 md:col-span-12 sm:col-span-6 col-span-12  | flex flex-col space-y-2"
          >
            <span className="text-black font-semibold">{type}</span>
            <div className="text-black">
              <PortableText blocks={value} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
