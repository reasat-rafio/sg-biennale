import { Slug } from "@lib/@types/global.types";
import { imageUrlBuilder } from "@utils/sanity";
import { useEffect, useState } from "react";
import { SanityImage, SanityImg } from "sanity-react-extra";

interface ModifyedPartnersList {
  tierName: string;
  id: string;
  data: PartnerListProps["partners"];
}

interface PartnerListProps {
  partners: {
    _id: string;
    name: string;
    description: string;
    image: SanityImage;
    slug: Slug;
    tier: {
      _id: string;
      title: string;
    };
  }[];
}

export const PartnerList: React.FC<PartnerListProps> = ({ partners }) => {
  const [_partners, setPartners] = useState<ModifyedPartnersList[] | null>(
    null
  );

  useEffect(() => {
    const newPatnersList: ModifyedPartnersList[] = Object.values(
      partners.reduce((newArr: any, patner) => {
        let tierName = patner.tier.title;

        !newArr[tierName]
          ? (newArr[tierName] = {
              tierName: patner.tier.title,
              id: patner.tier._id,
              data: [patner],
            })
          : newArr[tierName].data.push(patner);

        return newArr;
      }, {})
    );
    setPartners(newPatnersList);
  }, [partners]);
  console.log(_partners);

  return (
    <div className="flex flex-col | space-y-10">
      {_partners?.map(({ tierName, data, id }) => (
        <div className="pb-5" key={id}>
          <h2 className="text-2xl font-medium">{tierName}</h2>

          <div className="grid grid-cols-12 | py-10 lg:gap-x-7 sm:gap-x-3 lg:gap-y-14 gap-y-5">
            {data.map(({ _id, name, image }) => (
              <div
                key={_id}
                className="xl:col-span-3 md:col-span-4 sm:col-span-6 col-span-12"
              >
                <div className="lg:h-[350px] h-auto">
                  <SanityImg
                    width={300}
                    image={image}
                    className="w-full h-full | object-cover"
                    builder={imageUrlBuilder}
                    alt={`${name}'s logo`}
                  />
                </div>
                <h3 className="pt-5 | text-sm font-semibold">{name}</h3>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
