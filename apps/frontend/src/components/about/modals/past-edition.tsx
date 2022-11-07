import { PastEditionCollection } from "@lib/@types/about.types";
import useAboutStore from "@stores/about.store";
import { imageUrlBuilder, PortableText } from "@utils/sanity";
import { motion } from "framer-motion";
import { SanityImg } from "sanity-react-extra";
import { useWindowSize } from "@lib/hooks";
import { ModalBackdrop } from "@components/common/modal-backdrop";

interface PastEditionProps {}

export const PastEdition: React.FC<PastEditionProps> = ({}) => {
  const { pastEditions, selectedPastEditionId, setSelectedPastEditionId } =
    useAboutStore();
  const [selectedPastEdition] = pastEditions.filter(
    ({ _id }) => _id === selectedPastEditionId
  );

  return (
    <ModalBackdrop
      show={Boolean(selectedPastEditionId)}
      setSelectedVisible={setSelectedPastEditionId}
    >
      <Content {...selectedPastEdition} />
    </ModalBackdrop>
  );
};

const Content: React.FC<PastEditionCollection> = ({
  name,
  description,
  _id,
  image,
}) => {
  const windowWidth = useWindowSize()?.width ?? 0;

  return (
    <motion.article className="grid grid-cols-12 px-5  ">
      <motion.section className="lg:col-span-8 col-span-12 lg:max-w-[90%] space-y-8 ">
        <motion.h6
          layoutId={`past-edition-card-header-${_id}`}
          className="font-medium text-heading-6"
        >
          {name}
        </motion.h6>

        <motion.figure className="lg:hidden block">
          <SanityImg
            className="w-full object-cover max-h-[400px]"
            width={windowWidth >= 768 ? 200 : 120}
            image={image}
            builder={imageUrlBuilder}
            alt={name}
          />
        </motion.figure>

        <motion.div
          custom={0.8}
          className="text-gray--700 font-manrope text-body-1 lg:max-h-[50vh] h-auto lg:overflow-y-auto | lg:scrollbar-thin lg:scrollbar-thumb-red-love "
        >
          <div className="lg:pr-7">
            <PortableText blocks={description} />
          </div>
        </motion.div>
      </motion.section>

      <motion.figure
        layoutId={`past-edition-card-image-${_id}`}
        className="col-span-4 lg:block hidden"
      >
        <SanityImg
          className="w-full object-cover "
          width={windowWidth >= 1280 ? 300 : windowWidth >= 768 ? 200 : 120}
          image={image}
          builder={imageUrlBuilder}
          alt={name}
        />
      </motion.figure>
    </motion.article>
  );
};
