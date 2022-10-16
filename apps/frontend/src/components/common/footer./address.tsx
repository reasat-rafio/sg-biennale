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
      className="flex flex-col space-y-6 font-manrope w-full"
      style={{ all: "initial" }}
    >
      <div className="grid grid-cols-12">
        <span className="col-span-4 | font-semibold">{location.title}</span>
        <p className="col-span-8 | text-gray | whitespace-pre-line leading-primary">
          {location.address}
        </p>
      </div>
      <div className="grid grid-cols-12">
        <span className="col-span-4 | font-semibold">{social.title}</span>
        <div className="flex space-x-6 col-span-8">
          {social.socials.map(({ _key, icon, url }) => (
            <Link key={_key} href={url}>
              <a>
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
