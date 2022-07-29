import {
  ModifyedPartnersList,
  PartnerListProps,
} from "@lib/@types/partners.types";
import { useWindowSize } from "@lib/hooks";
import { imageUrlBuilder } from "@utils/sanity";
import { useEffect, useState } from "react";
import { SanityImg } from "sanity-react-extra";

export const PartnerList: React.FC<PartnerListProps> = ({ partners }) => {
  const windowWidth = useWindowSize()?.width ?? 0;

  const [_partners, setPartners] = useState<ModifyedPartnersList[] | null>(
    null
  );

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
    <div className="flex flex-col | space-y-10">
      {_partners?.map(({ tierName, data, id }) => (
        <article className="pb-5" key={id}>
          <h2 className="text-2xl font-medium">{tierName}</h2>

          <section className="grid grid-cols-12 | pt-5 lg:gap-x-7 sm:gap-x-3 lg:gap-y-14 gap-y-5">
            {data.map(({ _id, name, image }) => (
              <figure
                key={_id}
                className="xl:col-span-3 md:col-span-4 sm:col-span-6 col-span-12 | lg:h-[124px] lg:w-[220px] h-auto"
              >
                <SanityImg
                  width={windowWidth >= 768 ? 500 : 200}
                  image={image}
                  className="w-full h-full | object-cover"
                  builder={imageUrlBuilder}
                  alt={`${name}'s logo`}
                />
              </figure>
            ))}
          </section>
        </article>
      ))}
    </div>
  );
};
