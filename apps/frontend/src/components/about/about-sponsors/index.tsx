import { Container } from "@components/ui/container";
import { Header } from "@components/ui/header";
import { SponsorCollection } from "@lib/@types/about.types";
import { imageUrlBuilder } from "@utils/sanity";
import clsx from "clsx";
import { SanityImg } from "sanity-react-extra";
import { doTruncate } from "@lib/helpers/global.helpers";
import { Button } from "@components/ui/button";
import { useEffect } from "react";
import useAboutStore from "@stores/about.store";
import { motion } from "framer-motion";

interface AboutSponsorsProps {
  type: string;
  header: string;
  sponsorCollection: SponsorCollection[];
}

export const AboutSponsors: React.FC<AboutSponsorsProps> = ({
  header,
  sponsorCollection,
}) => {
  const { setAbouts, setSelectedAboutId, selectedAboutId } = useAboutStore();
  useEffect(() => {
    setAbouts(sponsorCollection);
  }, [sponsorCollection]);

  return (
    <Container className="py-x">
      <Header>{header}</Header>
      <div className="grid grid-cols-12 | mt-xl lg:gap-x-[9%] md:gap-x-[5%] md:gap-y-0 gap-y-10 ">
        {sponsorCollection.map(
          ({ _key, image, title, name, description, cta }) => (
            <article
              key={_key}
              className={clsx(
                "relative | md:col-span-6 col-span-12 grid grid-rows-2 | lg:gap-16 gap-10",
                selectedAboutId === _key && "z-30"
              )}
            >
              <motion.figure layoutId={`about-us-card-image-${_key}`}>
                <SanityImg
                  className="h-full w-full object-contain shadow-md"
                  image={image}
                  builder={imageUrlBuilder}
                  width={400}
                  alt={image.alt}
                />
              </motion.figure>
              <section>
                <div className="flex flex-col row-span-2 | space-y-4">
                  <motion.h4
                    layoutId={`about-us-card-title-${_key}`}
                    className="text-gray--400 font-bold font-manrope lg:text-body-1 text-body-2"
                  >
                    {title}
                  </motion.h4>
                  <motion.h5
                    layoutId={`about-us-card-name-${_key}`}
                    className={"lg:text-heading-5 text-heading-6 font-semibold"}
                  >
                    {name}
                  </motion.h5>
                  <motion.p
                    layoutId={`about-us-card-description-${_key}`}
                    className="font-manrope text-body-1 | text-gray--700"
                  >
                    {Boolean(description.length > 150)
                      ? `${doTruncate(description, 150)}...`
                      : description}
                  </motion.p>
                  <Button onClick={() => setSelectedAboutId(_key)}>
                    {cta.title}
                  </Button>
                </div>
              </section>
            </article>
          )
        )}
      </div>
    </Container>
  );
};
