import { PartnerListProps } from "@lib/@types/partners.types";
import { useWindowSize } from "@lib/hooks";
import { imageUrlBuilder } from "@utils/sanity";
import { SanityImg } from "sanity-react-extra";
import { motion } from "framer-motion";
import { Header } from "@components/ui/header";
import { useRouter } from "next/router";
import clsx from "clsx";

export const PartnerList: React.FC<PartnerListProps> = ({
  partnersAndTiers,
}) => {
  const router = useRouter();
  const windowWidth = useWindowSize()?.width ?? 0;

  const onClickAction = (href?: string) => {
    if (href && typeof window !== "undefined") router.push(href);
  };

  return (
    <div className="flex flex-col | space-y-10 xl:my-xxl lg:my-xl my-x">
      {partnersAndTiers.map(({ _key, partners, title }) => (
        <article className="pb-5 space-y-10" key={_key}>
          <Header variant="secondary">{title}</Header>

          <section className="grid grid-cols-12 | gap-5">
            {partners.map(({ _key, name, image, href }) => (
              <motion.figure
                key={_key}
                className={clsx(
                  "md:col-span-4 sm:col-span-6 col-span-12 | flex justify-center items-center | h-[255px] p-5 | bg-white  overflow-hidden",
                  href && "cursor-pointer"
                )}
                onClick={() => onClickAction(href)}
              >
                <SanityImg
                  width={windowWidth >= 768 ? 500 : 200}
                  image={image}
                  className="h-[70%] | object-contain"
                  builder={imageUrlBuilder}
                  alt={`${name}'s logo`}
                />
              </motion.figure>
            ))}
          </section>
        </article>
      ))}
    </div>
  );
};
