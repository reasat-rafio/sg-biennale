import { Button } from "@components/ui/button";
import { Container } from "@components/ui/container";
import { Cta } from "@lib/@types/global.types";
import { MoreInfosProps } from "@lib/@types/visitor-info.types";
import { WithImageSection } from "./more-info/with-image-section";
import { motion } from "framer-motion";

export const MoreInfos: React.FC<MoreInfosProps> = ({ moreInfos }) => {
  return (
    <Container className="xl:py-max lg:py-xl py-section">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
        viewport={{ margin: "-30%", once: true }}
        className="grid grid-cols-12 | lg:gap-10 gap-5"
      >
        {moreInfos.map(({ _key, title, subtitle, description, image, cta }) =>
          image ? (
            <WithImageSection
              _key={_key}
              title={title}
              subtitle={subtitle}
              description={description}
              cta={cta}
              image={image}
            />
          ) : (
            <Section
              _key={_key}
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
  _key?: string;
  title: string;
  subtitle?: string;
  description: string;
  cta: Cta;
}> = ({ cta, description, title, subtitle, _key }) => {
  return (
    <article
      key={_key}
      className=" grid grid-cols-12 sm:col-span-6 col-span-12 justify-center items-center | py-10"
    >
      <section className="col-span-12 | space-y-6">
        <h3 className="text-heading-6">{title}</h3>
        {subtitle && (
          <h6 className="text-heading-4 font-medium text-skyblue">
            {subtitle}
          </h6>
        )}
        <p className="text-body-1 text-gray--700 font-manrope">{description}</p>
        <Button variant="secondary">{cta.title}</Button>
      </section>
    </article>
  );
};
