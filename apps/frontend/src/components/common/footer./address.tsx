import { FooterLocation, FooterSocial } from "@lib/@types/global.types";
import { imageUrlBuilder } from "@utils/sanity";
import Link from "next/link";
import { SanityImg } from "sanity-react-extra";

interface AddressProps {
  location: FooterLocation;
  social: FooterSocial;
}

export const Address: React.FC<AddressProps> = ({ location, social }) => {
  return (
    <address
      className="flex md:flex-row flex-col | xl:space-x-20 md:space-x-10 space-y-10 md:space-y-0 | font-manrope w-full"
      style={{ all: "initial" }}
    >
      <div className="flex md:flex-row flex-col | md:space-x-10 md:space-y-0 space-y-3">
        <span className="font-semibold">{location.title}</span>
        <p className="md:text-body-1 text-body-2 | text-gray--700 | whitespace-pre-line leading-primary">
          {location.address}
        </p>
      </div>
      <div className="flex md:flex-row flex-col | md:space-x-10 md:space-y-0 space-y-3">
        <span className="font-semibold">{social.title}</span>
        <div className="flex items-start space-x-6 ">
          {social.socials.map(({ _key, icon, url }) => (
            <Link key={_key} href={url} prefetch={false}>
              <a className="sm:w-7 sm:h-7 h-6 w-6">
                <SanityImg
                  className="h-full w-full object-contain"
                  width={10}
                  image={icon}
                  builder={imageUrlBuilder}
                  alt={"social icon"}
                />
              </a>
            </Link>
          ))}
        </div>
      </div>
    </address>
  );
};
