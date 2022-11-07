import { TeamCollection } from "@lib/@types/about.types";
import useAboutStore from "@stores/about.store";
import { imageUrlBuilder, PortableText } from "@utils/sanity";
import { motion } from "framer-motion";
import { SanityImg } from "sanity-react-extra";
import { useWindowSize } from "@lib/hooks";
import { ModalBackdrop } from "@components/common/modal-backdrop";

interface CoArtistDirectorProps {}

export const CoArtistDirector: React.FC<CoArtistDirectorProps> = ({}) => {
  const {
    coArtisticDirectors,
    selectedCoArtisticDirectorId,
    setSelectedCoArtisticDirectorId,
  } = useAboutStore();
  const [selectedcoArtisticDirector] = coArtisticDirectors.filter(
    ({ _key }) => _key === selectedCoArtisticDirectorId
  );

  return (
    <ModalBackdrop
      show={Boolean(selectedCoArtisticDirectorId)}
      setSelectedVisible={setSelectedCoArtisticDirectorId}
    >
      <Content {...selectedcoArtisticDirector} />
    </ModalBackdrop>
  );
};

const Content: React.FC<TeamCollection> = ({
  cardBackgroundGardiants: { from, to },
  team,
  _key,
}) => {
  const windowWidth = useWindowSize()?.width ?? 0;

  return (
    <motion.article className="grid grid-cols-12 px-5  ">
      <motion.section className="lg:col-span-8 col-span-12 lg:max-w-[90%] space-y-8 ">
        <motion.h6
          layoutId={`co-artist-card-header-${_key}`}
          className="font-medium text-heading-6"
        >
          {team.name}
        </motion.h6>

        <motion.figure
          className="lg:hidden flex | justify-center items-end"
          style={{
            background: `linear-gradient(180deg, ${from.hex} 0%, ${to.hex} 100%)`,
          }}
        >
          <SanityImg
            className="w-full object-contain max-h-[400px]"
            width={windowWidth >= 768 ? 200 : 130}
            image={team.images[0]}
            builder={imageUrlBuilder}
            alt={team.name}
          />
        </motion.figure>

        <motion.div
          custom={0.8}
          className="text-gray--700 font-manrope text-body-1 lg:max-h-[50vh] h-auto lg:overflow-y-auto | lg:scrollbar-thin lg:scrollbar-thumb-red-love "
        >
          <div className="lg:pr-7">
            <PortableText blocks={team.description} />
          </div>
        </motion.div>
      </motion.section>

      <motion.figure
        layoutId={`co-artist-card-image-${_key}`}
        className="col-span-4 lg:flex hidden | justify-center items-end"
        style={{
          background: `linear-gradient(180deg, ${from.hex} 0%, ${to.hex} 100%)`,
        }}
      >
        <SanityImg
          className="w-full object-cover "
          width={windowWidth >= 1280 ? 300 : windowWidth >= 768 ? 200 : 150}
          image={team.images[0]}
          builder={imageUrlBuilder}
          alt={team.name}
        />
      </motion.figure>
    </motion.article>
  );
};
