import { Container } from "@components/ui/container";
import { Cta } from "@lib/@types/global.types";
import { MoreInfosProps } from "@lib/@types/visitor-info.types";
import { WithImageSection } from "./more-info/with-image-section";
import { motion } from "framer-motion";
import { Header } from "@components/ui/header";
import { LiquidButton } from "@components/ui/liquid-button";
import { useRouter } from "next/router";

export const MoreInfos: React.FC<MoreInfosProps> = ({ moreInfos }) => {
  return (
    <Container className="xl:py-max lg:py-xl py-section | overflow-hidden">
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
    <article className=" grid grid-cols-12 sm:col-span-6 col-span-12 justify-center items-center | py-10">
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
          <LiquidButton
            onClick={() => router.push(cta.href)}
            variant="secondary"
          >
            {cta.title}
          </LiquidButton>
        )}
      </section>
    </article>
  );
};
