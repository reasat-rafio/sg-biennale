import { Button } from "@components/ui/button";
import { Container } from "@components/ui/container";
import { imageUrlBuilder } from "@utils/sanity";
import { SanityImage, SanityImg } from "sanity-react-extra";
import { motion } from "framer-motion";
import { useWindowSize } from "@lib/hooks";
import { LiquidButton } from "@components/ui/liquid-button";

interface RecentUpdateProps {
  header: string;
  description: string;
  updates: {
    _id: string;
    header: string;
    images: SanityImage;
  }[];
}

export const RecentUpdate: React.FC<RecentUpdateProps> = ({
  description,
  header,
  updates,
}) => {
  const windowWidth = useWindowSize()?.width ?? 0;

  return (
    <Container className="grid grid-cols-12 | xl:gap-14 lg:gap-7 gap-4 2xl:py-max py-xl">
      <header className="xl:col-span-4 col-span-12 xl:space-y-10 space-y-12">
        <h4 className="text-gray--200 text-heading-2 leading-[115%] font-medium">
          {header}
        </h4>
        <p className="text-body-1 font-manrope text-gray--700">{description}</p>
      </header>
      <section className="xl:col-span-8 col-span-12 | grid grid-cols-12 | xl:gap-14 lg:gap-7 gap-4 xl:mt-10 mt-12">
        {updates.map((update, index) => (
          <motion.article
            key={update._id}
            className="md:col-span-6 col-span-12 | md:mt-0 mt-20 space-y-5 "
            style={{
              y: windowWidth >= 1024 ? `${index * 25}%` : 0,
            }}
            initial={{ y: "100%" }}
            animate={{ y: windowWidth >= 1024 ? `${index * 25}%` : 0 }}
            transition={{
              type: "tween",
              duration: 0.7,
              ease: "easeInOut",
              delay: 3,
            }}
          >
            <figure className="2xl:h-[370px] xl:h-[300px] lg:h-[300px]md:h-[250px] h-auto">
              <SanityImg
                className="w-full h-full object-cover"
                image={update.images[0]}
                builder={imageUrlBuilder}
                alt=""
              />
            </figure>
            <section className=" w-full">
              <h6 className="text-gray--700 font-medium text-heading-6 leading-[120%]">
                {update.header}
              </h6>

              <LiquidButton
                variant="secondary"
                className="mt-7 overflow-visible"
              >
                Read More
              </LiquidButton>
            </section>
          </motion.article>
        ))}
      </section>
    </Container>
  );
};
