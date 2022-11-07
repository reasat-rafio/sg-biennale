import { ModalBackdrop } from "@components/common/modal-backdrop";
import { SponsorCollection } from "@lib/@types/about.types";
import { useWindowSize } from "@lib/hooks";
import useAboutStore from "@stores/about.store";
import { imageUrlBuilder } from "@utils/sanity";
import { motion } from "framer-motion";
import { SanityImg } from "sanity-react-extra";

interface AboutProps {}

export const About: React.FC<AboutProps> = ({}) => {
  const { abouts, selectedAboutId, setSelectedAboutId } = useAboutStore();
  const [selectedPastEdition] = abouts.filter(
    ({ _key }) => _key === selectedAboutId
  );

  return (
    <ModalBackdrop
      show={Boolean(selectedAboutId)}
      setSelectedVisible={setSelectedAboutId}
    >
      <Content {...selectedPastEdition} />
    </ModalBackdrop>
  );
};

const Content: React.FC<SponsorCollection> = ({
  name,
  description,
  image,
  _key,
  title,
}) => {
  const windowWidth = useWindowSize()?.width ?? 0;

  return (
    <motion.article className="grid grid-cols-12 xl:gap-10 md:gap-5 px-5">
      <motion.figure
        layoutId={`about-us-card-image-${_key}`}
        className="col-span-6 lg:block hidden"
      >
        <SanityImg
          className="w-full object-cover shadow-md"
          width={windowWidth >= 1280 ? 450 : windowWidth >= 768 ? 200 : 120}
          image={image}
          builder={imageUrlBuilder}
          alt={name}
        />
      </motion.figure>
      <motion.section className="lg:col-span-6 col-span-12 space-y-8 ">
        <div className="flex flex-col | space-y-4">
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

          <motion.figure className="lg:hidden block">
            <SanityImg
              className="w-full object-cover max-h-[400px]"
              width={windowWidth >= 768 ? 250 : 120}
              image={image}
              builder={imageUrlBuilder}
              alt={name}
            />
          </motion.figure>
          <motion.p
            layoutId={`about-us-card-description-${_key}`}
            className="font-manrope text-body-1 | text-gray--700"
          >
            {description}
          </motion.p>
        </div>
      </motion.section>
    </motion.article>
  );
};
