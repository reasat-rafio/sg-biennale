import { Anchor } from "@components/ui/anchor";
import { Container } from "@components/ui/container";
import { LiquidButton } from "@components/ui/liquid-button";
import { InformationProps } from "@lib/@types/venue-details";
import { imageUrlBuilder, PortableText } from "@utils/sanity";
import { SanityImage, SanityImg } from "sanity-react-extra";

interface HeroProps {
  name: string;
  image: SanityImage;
  informations: InformationProps[];
}

export const Hero: React.FC<HeroProps> = ({ image, informations, name }) => {
  const onAnchorClickAction = () => {};

  return (
    <Container className="flex flex-col | space-y-7 mt-xl">
      <Anchor onClick={onAnchorClickAction} className="text-gray--700">
        Back to Visitor Info
      </Anchor>
      <Header name={name} />

      <section className="grid grid-cols-12 gap-5">
        <figure className="xl:col-span-7 md:col-span-6 col-span-12">
          <SanityImg
            className="h-full w-full object-cover"
            image={image}
            builder={imageUrlBuilder}
            width={800}
          />
        </figure>
        <div className="xl:col-span-5 md:col-span-6 col-span-12 h-min | px-5 rounded | divide-y-2 bg-gray--100 divide-[#CCCCCC]">
          {informations.map((props) => (
            <Information {...props} />
          ))}
        </div>
      </section>
    </Container>
  );
};

const Header: React.FC<{ name: string }> = ({ name }) => {
  return (
    <div className="flex md:flex-row flex-col | items-center md:space-x-5 md:space-y-0 space-y-5">
      <header className="flex-1">
        <h1 className="2xl:text-heading-3 xl:text-heading-4 text-heading-5 font-medium md:text-left text-center">
          {name}
        </h1>
      </header>
      <LiquidButton variant="secondary">Get Directions</LiquidButton>
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
