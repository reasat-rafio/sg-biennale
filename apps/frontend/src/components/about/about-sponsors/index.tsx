import { Container } from "@components/ui/container";
import { Header } from "@components/ui/header";
import { SponsorCollection } from "@lib/@types/about.types";
import { imageUrlBuilder } from "@utils/sanity";
import clsx from "clsx";
import { SanityImg } from "sanity-react-extra";
import { doTruncate } from "@lib/helpers/global.helpers";
import { Button } from "@components/ui/button";

interface AboutSponsorsProps {
  type: string;
  header: string;
  sponsorCollection: SponsorCollection[];
}

export const AboutSponsors: React.FC<AboutSponsorsProps> = ({
  header,
  sponsorCollection,
}) => {
  return (
    <Container className="py-x">
      <Header className="py-1">{header}</Header>
      <div className="grid grid-cols-12 | mt-xl lg:gap-x-[9%] md:gap-x-[5%] md:gap-y-0 gap-y-10 ">
        {sponsorCollection.map(
          ({ _key, image, title, name, description, cta }) => (
            <article
              key={_key}
              className="md:col-span-6 col-span-12 grid grid-rows-2 | lg:gap-16 gap-10"
            >
              <figure>
                <SanityImg
                  className="h-full w-full object-contain shadow-md"
                  image={image}
                  builder={imageUrlBuilder}
                  width={400}
                  alt={image.alt}
                />
              </figure>
              <section>
                <div className="flex flex-col row-span-2 | space-y-4">
                  <h4 className="text-gray--400 font-bold font-manrope lg:text-body-1 text-body-2">
                    {title}
                  </h4>
                  <h5
                    className={"lg:text-heading-5 text-heading-6 font-semibold"}
                  >
                    {name}
                  </h5>
                  <p className="font-manrope text-body-1 | text-gray--700">
                    {doTruncate(description, 150)}
                  </p>
                  <Button>{cta.title}</Button>
                </div>
              </section>
            </article>
          )
        )}
      </div>
    </Container>
  );
};
