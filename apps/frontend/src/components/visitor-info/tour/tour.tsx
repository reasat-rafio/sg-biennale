import { Container } from "@components/ui/container";
import { Cta } from "@lib/@types/global.types";
import { SanityImage } from "sanity-react-extra";
import { motion } from "framer-motion";

const ImageScene = dynamic(() => import("./image-scene"), {
  ssr: false,
});

import dynamic from "next/dynamic";
import { Header } from "@components/ui/header";
import { LiquidButton } from "@components/ui/liquid-button";

interface TourProps {
  header: string;
  description: string;
  image: SanityImage;
  cta: Cta;
}

export const Tour: React.FC<TourProps> = ({
  header,
  description,
  image,
  cta,
}) => {
  return (
    <Container type="section" className="lg:pb-max pb-xxl">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ margin: "-10%" }}
      >
        <Header>{header}</Header>
        <div className="grid grid-cols-12 | mt-10 lg:gap-10 gap-5">
          <figure className="xl:col-span-8 lg:col-span-6 col-span-12 | 2xl:h-[600px] xl:h-[550px] lg:h-[480px] md:h-[450px] sm:h-[400px] h-[300px]">
            <ImageScene image={image} />
          </figure>
          <div className="xl:col-span-4 lg:col-span-6 col-span-12 | font-manrope text-gray--700 text-body-1 | space-y-4 mt-auto">
            <p>{description}</p>
            <LiquidButton variant="secondary">{cta.title}</LiquidButton>
          </div>
        </div>
      </motion.div>
    </Container>
  );
};
