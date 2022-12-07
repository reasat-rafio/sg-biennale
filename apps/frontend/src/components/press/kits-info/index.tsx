import { Cta } from "@lib/@types/global.types";
import { useIntersection, useWindowSize } from "@lib/hooks";
import clsx from "clsx";
import { useRef } from "react";
import { SanityImage } from "sanity-react-extra";
import { Header } from "./header";
import { Image } from "./image";
import { InfoAndContacts, InfoAndContactsProps } from "./info-contact";

interface KitsInfoProps {
  _key?: string;
  header: string;
  description: string;
  image?: SanityImage;
  cta: Cta;
  infoAndContacts?: InfoAndContactsProps;
}

export const KitsInfo: React.FC<{ kitInfos: KitsInfoProps[] }> = ({
  kitInfos,
}) => {
  const windowWidth = useWindowSize()?.width ?? 0;

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
                image ? "col-span-12" : "sm:col-span-6 col-span-12"
              )}
            >
              <div
                className={clsx(
                  "grid grid-rows-6 | xl:pr-20 lg:pr-10",
                  image
                    ? "col-span-12 lg:col-span-6 2xl:col-span-5"
                    : "col-span-12 "
                )}
              >
                <Header
                  intersecting={intersecting?.isIntersecting}
                  header={header}
                  description={description}
                  cta={cta}
                  image={image}
                  takeMinRawSpan={Boolean(infoAndContacts?.infos)}
                />
                {infoAndContacts?.infos && (
                  <InfoAndContacts {...infoAndContacts} />
                )}
              </div>
              {image && windowWidth >= 1024 && (
                <div className="col-span-12 lg:col-span-6 2xl:col-span-7 | flex justify-center items-center overflow-hidden">
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
