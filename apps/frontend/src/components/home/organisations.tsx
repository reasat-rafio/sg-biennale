import { OrganisationProps } from "@lib/@types/home.types";
import { imageUrlBuilder } from "@utils/sanity";
import clsx from "clsx";
import { useState } from "react";
import { SanityImg } from "sanity-react-extra";

export const Organisations: React.FC<OrganisationProps> = ({
  organisations,
}) => {
  const [selectedLogo, setSelectedLogo] = useState(organisations[0].logo);

  return (
    <section
      style={{
        background: `linear-gradient(180deg, #F5F5F5 0%, rgba(245, 245, 245, 0) 100%)`,
      }}
      className="min-h-[70vh] "
    >
      <div className="container lg:px-32 px-60 grid grid-cols-12 justify-center items-center | lg:space-x-5 space-x-2 py-20">
        <div className="col-span-5 space-y-6 ">
          {organisations.map(({ _key, name, title, logo }) => (
            <div
              key={_key}
              className="font-manrope cursor-pointer"
              onClick={() => setSelectedLogo(logo)}
            >
              <h6 className="text-secondary-gray font-bold text-[24px] leading-tight ">
                {title}
              </h6>
              <span
                className={clsx(
                  "text-[36px] font-extrabold transition-colors duration-300 ease-in-out leading-tight",
                  selectedLogo.asset._id === logo.asset._id
                    ? "text-black"
                    : "text-secondary-gray"
                )}
              >
                {name}
              </span>
            </div>
          ))}
        </div>
        <figure className="col-span-7 ">
          <SanityImg
            className="h-full w-full shadow-xl object-contain"
            builder={imageUrlBuilder}
            image={selectedLogo}
            width={500}
          />
        </figure>
      </div>
    </section>
  );
};
