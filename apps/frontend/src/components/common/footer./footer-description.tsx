import { Location } from "@components/icons/location";
import { Container } from "@components/ui/container";
import { ISite } from "@lib/@types/global.types";
import { imageUrlBuilder } from "@utils/sanity";
import Link from "next/link";
import { SanityImg } from "sanity-react-extra";

interface FooterDescriptionProps {
  address: ISite["site"]["footer"]["address"];
  socials: ISite["site"]["footer"]["socials"];
}

export const FooterDescription: React.FC<FooterDescriptionProps> = ({
  address,
  socials,
}) => {
  return (
    <Container className="py-3 flex items-center lg:flex-row flex-col ">
      <div className="flex flex-1 space-x-1">
        <Location />
        <span>{address}</span>
      </div>
      <div className="flex space-x-2">
        {socials.map(({ _key, icon, url }) => (
          <Link key={_key} href={url}>
            <a>
              <SanityImg
                width={22}
                image={icon}
                builder={imageUrlBuilder}
                alt={"social icon"}
              />
            </a>
          </Link>
        ))}
      </div>
    </Container>
  );
};
