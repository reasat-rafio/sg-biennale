import { Container } from "@components/ui/container";
import { Cta } from "@lib/@types/global.types";
import { MoreInfosProps } from "@lib/@types/visitor-info.types";
import { motion } from "framer-motion";
import { Header } from "@components/ui/header";
import { useRouter } from "next/router";
import { Button } from "@components/ui/button";
import { useWindowSize } from "@lib/hooks";
import { SanityImg, SanityImage } from "sanity-react-extra";
import { imageUrlBuilder } from "@utils/sanity";

export const MoreInfos: React.FC<MoreInfosProps> = ({ moreInfos }) => {
  return (
    <Container className="xl:pt-x pt-section | overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-12 | lg:gap-10 gap-5"
      >
        {moreInfos.map(({ _key, title, subtitle, description, image, cta }) =>
          image?.asset ? (
            <WithImageSection
              key={_key}
              title={title}
              subtitle={subtitle}
              description={description}
              cta={cta}
              image={image}
            />
          ) : (
            <Section
              key={_key}
              title={title}
              subtitle={subtitle}
              description={description}
              cta={cta}
            />
          )
        )}
      </motion.div>
    </Container>
  );
};

const Section: React.FC<{
  key?: string;
  title: string;
  subtitle?: string;
  description: string;
  cta?: Cta;
}> = ({ cta, description, title, subtitle }) => {
  const router = useRouter();
  return (
    <article className=" grid grid-cols-12 sm:col-span-6 col-span-12 justify-center items-center | py-5">
      <section className="col-span-12 | space-y-6">
        <Header variant="secondary">{title}</Header>
        {subtitle && (
          <h6 className="text-heading-4 font-medium text-skyblue">
            {subtitle}
          </h6>
        )}
        <p className="text-body-1 text-gray--700 font-manrope whitespace-pre-line">
          {description}
        </p>
        {cta?.title && (
          <Button onClick={() => router.push(cta.href)} variant="secondary">
            {cta.title}
          </Button>
        )}
      </section>
    </article>
  );
};

interface WithImageSectionProps {
  title: string;
  subtitle?: string;
  description: string;
  cta?: Cta;
  image: SanityImage;
}

export const WithImageSection: React.FC<WithImageSectionProps> = ({
  cta,
  description,
  image,
  title,
  subtitle,
}) => {
  const router = useRouter();
  const windowWidth = useWindowSize()?.width ?? 0;
  return (
    <motion.article className="grid grid-cols-12 col-span-12 justify-center items-center | py-5 lg:gap-10 gap-5">
      <section className="xl:col-span-7 md:col-span-6 col-span-12 | space-y-6">
        <Header variant="secondary">{title}</Header>
        {subtitle && (
          <h6 className="lg:text-heading-4 text-heading-5 font-medium text-skyblue">
            {subtitle}
          </h6>
        )}
        <p className="text-body-1 text-gray--700 font-manrope | whitespace-pre-line">
          {description}
        </p>
        {cta && (
          <Button onClick={() => router.push(cta.href)} variant="secondary">
            {cta.title}
          </Button>
        )}
      </section>
      <motion.figure className="xl:col-span-5 md:col-span-6 col-span-12 -z-20">
        <SanityImg
          className="h-full w-full object-cover"
          builder={imageUrlBuilder}
          image={image}
          width={windowWidth >= 1280 ? 500 : windowWidth >= 768 ? 350 : 150}
          alt={image.alt}
          loading="eager"
        />
      </motion.figure>
    </motion.article>
  );
};
