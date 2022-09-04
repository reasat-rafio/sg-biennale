import { Button } from "@components/ui/button";
import { Container } from "@components/ui/container";
import { imageUrlBuilder } from "@utils/sanity";
import { SanityImage, SanityImg } from "sanity-react-extra";
import { motion } from "framer-motion";
import { useWindowSize } from "@lib/hooks";

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
    <Container className="grid grid-cols-12 | gap-14 py-max">
      <header className="xl:col-span-4 col-span-12 space-y-4">
        <h4 className="text-gray--200 text-heading-2 leading-[115%] font-medium">
          {header}
        </h4>
        <p className="text-body-1 font-manrope text-gray--700">{description}</p>
      </header>
      <section className="xl:col-span-8 col-span-12 | grid grid-cols-12 | gap-14">
        {updates.map((update, index) => (
          <motion.article
            key={update._id}
            className="md:col-span-6 col-span-12 space-y-5 "
            style={{
              y: windowWidth >= 1024 ? `${index * 25}%` : 0,
            }}
            initial={{ y: "100%" }}
            animate={{ y: windowWidth >= 1024 ? `${index * 25}%` : 0 }}
            transition={{
              type: "tween",
              duration: 0.7,
              ease: "easeInOut",
              delay: 3.5,
            }}
          >
            <figure>
              <SanityImg
                image={update.images[0]}
                builder={imageUrlBuilder}
                alt=""
              />
            </figure>
            <section>
              <h6 className="text-gray--700 font-medium text-heading-6 leading-[120%]">
                {update.header}
              </h6>
              <Button className="mt-7" variant="secondary">
                Read More
              </Button>
            </section>
          </motion.article>
        ))}
      </section>
    </Container>
  );
};
