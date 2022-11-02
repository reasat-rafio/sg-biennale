import {
  ModifyedPartnersList,
  PartnerListProps,
} from "@lib/@types/partners.types";
import { useWindowSize } from "@lib/hooks";
import { imageUrlBuilder } from "@utils/sanity";
import { useEffect, useState } from "react";
import { SanityImg } from "sanity-react-extra";
import { motion } from "framer-motion";
import { Header } from "@components/ui/header";
import { useRouter } from "next/router";
import clsx from "clsx";

export const PartnerList: React.FC<PartnerListProps> = ({ partners }) => {
  const router = useRouter();
  const windowWidth = useWindowSize()?.width ?? 0;
  const [_partners, setPartners] = useState<ModifyedPartnersList[] | null>(
    null
  );

  const onClickAction = (href?: string) => {
    if (href && typeof window !== "undefined") router.push(href);
  };

  useEffect(() => {
    const newPatnersList: ModifyedPartnersList[] = Object.values(
      partners.reduce((newArr: any, patner) => {
        let tierName = patner.tier.title;
        let order = patner.tier.order;
        !newArr[tierName]
          ? (newArr[tierName] = {
              tierName,
              order,
              id: patner.tier._id,
              data: [patner],
            })
          : newArr[tierName].data.push(patner);

        return newArr;
      }, {})
    );
    /* ❓ sorting the partnes by their tiper level */
    const sortPartnersByTierLevel = newPatnersList.sort((a, b) =>
      a.order > b.order ? 1 : -1
    );
    setPartners(sortPartnersByTierLevel);
  }, [partners]);

  return (
    <div className="flex flex-col | space-y-10 xl:my-xxl lg:my-xl my-x">
      {_partners?.map(({ tierName, data, id }) => (
        <article className="pb-5 space-y-10" key={id}>
          <Header variant="secondary">{tierName}</Header>

          <section className="grid grid-cols-12 | gap-5">
            {data.map(({ _id, name, image, href }) => (
              <motion.figure
                key={_id}
                className={clsx(
                  "md:col-span-4 sm:col-span-6 col-span-12 | flex justify-center items-center | h-[255px] p-5 | bg-white  border border-gray--200 | overflow-hidden",
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
