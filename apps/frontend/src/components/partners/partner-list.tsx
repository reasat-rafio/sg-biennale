import { Slug } from "@lib/@types/global.types";
import { imageUrlBuilder } from "@utils/sanity";
import { SanityImage, SanityImg } from "sanity-react-extra";

interface PartnerListProps {
  partners: {
    _id: string;
    name: string;
    description: string;
    image: SanityImage;
    slug: Slug;
  }[];
}

export const PartnerList: React.FC<PartnerListProps> = ({ partners }) => {
  return (
    <div className="grid grid-cols-12 | py-10 lg:gap-x-7 sm:gap-x-3 lg:gap-y-14 gap-y-5">
      {partners.map(({ _id, name, image }) => (
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
  );
};
