import { Calender } from "@components/icons/calender";
import { Cta } from "@lib/@types/global.types";
import { MoreInfo } from "@lib/@types/visitor-info.types";
import { imageUrlBuilder } from "@utils/sanity";
import Link from "next/link";
import { MoreInfoBlock } from "./more-info-block";

interface AdmissionProps {
  type: string;
  cta: Cta;
  moreInfos: MoreInfo[];
  title: string;
}

export const Admission: React.FC<AdmissionProps> = ({
  title,
  cta,
  moreInfos,
}) => {
  return (
    <section className="flex flex-col | space-y-10 py-10 | border-b-2 border-black">
      <h3 className="text-lg font-medium">{title}</h3>
      <button className="flex">
        <Link href={cta.href}>
          <a className="flex items-center | space-x-2 py-2 px-5 | bg-black  text-white | rounded-3xl">
            <Calender />
            <span className="md:text-lg text-base">{cta.title}</span>
          </a>
        </Link>
      </button>

      <div className="grid grid-cols-12 | xl:gap-x-24 xl:gap-y-16 gap-5">
        {moreInfos.map((moreInfo) => (
          <MoreInfoBlock
            key={moreInfo.key}
            className="lg:col-span-6 col-span-12"
            moreInfo={moreInfo}
          />
        ))}
      </div>
    </section>
  );
};
