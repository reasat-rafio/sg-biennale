import { Button } from "@components/ui/button";
import { Cta } from "@lib/@types/global.types";
import { imageUrlBuilder } from "@utils/sanity";
import { SanityImage, SanityImg } from "sanity-react-extra";
import { motion } from "framer-motion";
import { SlideupLettersAnimation } from "@components/ui/animated-component/slideup-letters-animation";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { useIntersection, useWindowSize } from "@lib/hooks";
import clsx from "clsx";

interface InfoAndContactsProps {
  title: string;
  infos: {
    _key?: string;
    label: string;
    value: string;
  }[];
}
interface KitsInfoProps {
  _key?: string;
  header: string;
  description: string;
  image?: SanityImage;
  cta: Cta;
  infoAndContacts: InfoAndContactsProps;
}

export const KitsInfo: React.FC<{ kitInfos: KitsInfoProps[] }> = ({
  kitInfos,
}) => {
  return (
    <section className="grid grid-cols-12 | 2xl:pt-max lg:pt-xl">
      {kitInfos.map(
        ({ _key, cta, description, header, image, infoAndContacts }) => {
          const sectionRef = useRef<HTMLElement | null>(null);
          const intersecting = useIntersection(sectionRef, { threshold: 0.25 });

          return (
            <section
              key={_key}
              ref={sectionRef}
              className={clsx(
                "grid grid-cols-12 | xl:pb-14 xl:px-0 lg:px-x sm:px-lg px-md pt-section",
                image ? "col-span-12" : "col-span-6"
              )}
            >
              <div
                className={clsx(
                  "grid grid-rows-6 | xl:pr-20 lg:pr-10",
                  image
                    ? "col-span-12 lg:col-span-6 xl:col-span-5"
                    : "col-span-12"
                )}
              >
                <Header
                  intersecting={intersecting?.isIntersecting}
                  header={header}
                  description={description}
                  cta={cta}
                  image={image}
                />
                <InfoAndContacts {...infoAndContacts} />
              </div>
              {image && (
                <div className="col-span-12 lg:col-span-6 xl:col-span-7 | flex justify-center items-center overflow-hidden">
                  <Image url={image} />
                </div>
              )}
            </section>
          );
        }
      )}
    </section>
  );
};

const Header: React.FC<{
  header: string;
  description: string;
  cta: Cta;
  intersecting: boolean | undefined;
  image?: SanityImage;
}> = ({ header, description, cta, intersecting, image }) => {
  const windowWidth = useWindowSize()?.width ?? 0;
  const [positionedAtRight, setPositionedAtRight] = useState(false);

  const headerRef = useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      node.getBoundingClientRect().left > windowWidth / 2
        ? setPositionedAtRight(false)
        : setPositionedAtRight(true);
    }
  }, []);

  return (
    <div
      ref={headerRef}
      className={clsx(
        "row-span-4 | flex flex-col | border-b | space-y-4 py-5",
        image ? "justify-center" : "justify-start",
        positionedAtRight && "xl:pl-max"
      )}
    >
      <motion.h2 className="text-red-love font-medium xl:text-heading-4 text-heading-5 | overflow-hidden">
        <SlideupLettersAnimation
          animationType="inview"
          intersecting={intersecting}
        >
          {header}
        </SlideupLettersAnimation>
      </motion.h2>
      <p className="font-manrope text-body-2 text-gray--700">{description}</p>
      <div className="xl:pt-9 pt-5">
        <Button
          variant="secondary"
          type="href"
          href={cta?.href}
          icon={
            <SanityImg
              className="w-[14px] h-[13px]"
              width={14}
              image={cta.icon}
              builder={imageUrlBuilder}
              alt="download icon"
            />
          }
        >
          {cta.title}
        </Button>
      </div>
    </div>
  );
};

const InfoAndContacts: React.FC<InfoAndContactsProps> = ({ infos, title }) => {
  return (
    <div className="row-span-2 | flex flex-col justify-center py-5 | xl:pl-max space-y-4 | font-manrope">
      <h6 className="text-body-1 font-semibold">{title}</h6>
      <ul>
        {infos.map(({ _key, label, value }) => (
          <li
            className="grid sm:grid-cols-2 grid-cols-1 | mt-2 | text-body-2"
            key={_key}
          >
            <span>{label}</span>
            <span>{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Image: React.FC<{ url: SanityImage }> = ({ url }) => {
  return (
    <motion.figure
      initial={{ scale: 0.9 }}
      whileInView={{
        scale: 1.1,
      }}
      transition={{ type: "tween", duration: 0.7, ease: "easeInOut" }}
      viewport={{ margin: "-20%" }}
      className="max-h-[700px] overflow-hidden"
    >
      <SanityImg
        className="h-full w-full object-cover "
        width={1080}
        image={url}
        builder={imageUrlBuilder}
      />
    </motion.figure>
  );
};
