import { ISite } from "@lib/@types/global.types";
import { getShuffledArr } from "@lib/helpers/global.helpers";
import { imageUrlBuilder } from "@utils/sanity";
import { useEffect, useState } from "react";
import { SanityImg, SanityImage } from "sanity-react-extra";
import { Address } from "./address";
import { NewsLetter } from "./news-letter";

export const Footer: React.FC<ISite["site"]> = ({
  date,
  kvs,
  footer: { header, location, newsLetter, social },
}) => {
  const [suffledKVs, setSuffledKVs] = useState<SanityImage[]>(kvs[0]);

  useEffect(() => {
    setSuffledKVs(getShuffledArr(kvs));
  }, []);

  return (
    <footer
      id="footer"
      className="relative | grid grid-cols-12 | sm:gap-10 gap-5 xl:pb-14 xl:px-0 lg:px-x sm:px-lg px-md py-10 xl:pl-max"
    >
      <section className="col-span-12 lg:col-span-5 flex flex-col justify-center items-center | xl:space-y-20">
        <header className="w-full | font-semibold">
          <h4 className=" mb-4 | lg:text-left text-center | whitespace-pre-wrap | lg:text-heading-4 text-heading-6">
            {header}
          </h4>
          <h6 className="font-manrope | lg:text-left text-center"> {date}</h6>
        </header>
        <NewsLetter {...newsLetter} />
        <Address social={social} location={location} />
      </section>
      <section className="col-span-12 xl:col-span-6 lg:col-span-7 flex justify-center items-center max-h-[700px] ">
        <figure className="h-full xl:w-auto w-full object-contain | xl:p-[10%] p-[5%] | bg-[url('/bg/footer-background-decor.png')] bg-repeat  | border border-black bg-contain">
          <SanityImg
            className="object-center h-full w-full object-contain"
            width={500}
            image={suffledKVs[0] ?? kvs[0]}
            builder={imageUrlBuilder}
            alt={`${header}' image`}
          />
        </figure>
      </section>
    </footer>
  );
};
