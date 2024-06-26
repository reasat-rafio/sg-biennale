import { OrganisationProps } from "@lib/@types/home.types";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Container } from "@components/ui/container";
import { useWindowSize } from "@lib/hooks";
import { SanityImg } from "sanity-react-extra";
import { imageUrlBuilder } from "@utils/sanity";
import { useRouter } from "next/router";

export const Organisations: React.FC<OrganisationProps> = ({
  organisations,
}) => {
  const router = useRouter();
  const windowWidth = useWindowSize()?.width ?? 0;

  return (
    <Container
      type="section"
      className="lg:py-xxl py-x"
      style={{
        background: `linear-gradient(180deg, #F5F5F5 0%, rgba(245, 245, 245, 0) 100%)`,
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="grid grid-cols-12 lg:gap-16 sm:gap-10 gap-4"
      >
        {organisations.map(({ _key, logo, title, url }) => (
          <article
            key={_key}
            className="grid grid-rows-6 xl:col-span-4 sm:col-span-6 col-span-12 | space-y-2 sm:space-y-5"
          >
            <section className="flex flex-col row-span-2 | space-y-2">
              <h4 className="text-gray--400 font-bold font-manrope lg:text-body-1 text-body-2">
                {title}
              </h4>
            </section>
            <figure className="row-span-4">
              <SanityImg
                className="h-full w-full object-contain"
                width={
                  windowWidth >= 1024 ? 400 : windowWidth >= 640 ? 250 : 120
                }
                builder={imageUrlBuilder}
                image={logo}
                alt={logo.alt}
              />
            </figure>
          </article>
        ))}
      </motion.div>
    </Container>
  );
};
