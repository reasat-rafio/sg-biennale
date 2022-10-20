import { Container } from "@components/ui/container";
import { imageUrlBuilder } from "@utils/sanity";
import Link from "next/link";
import { SanityImage, SanityImg } from "sanity-react-extra";

interface InformationProps {
  socials: {
    _key: string;
    name: string;
    url: string;
    icon: SanityImage;
  }[];
  address: {
    address: string;
    icon: SanityImage;
  };
}

export const Information: React.FC<InformationProps> = ({
  address,
  socials,
}) => {
  return (
    <Container className="flex | py-1 space-x-5 | border-b border-black">
      <div className="flex flex-1 | space-x-1 ">
        <SanityImg
          image={address.icon}
          width={15}
          builder={imageUrlBuilder}
          alt="location icon"
        />
        <span>{address.address}</span>
      </div>
      <ul className="flex space-x-2">
        {socials.map(({ _key, icon, url, name }) => (
          <Link href={url} key={_key}>
            <a className="flex space-x-1">
              <SanityImg
                width={15}
                image={icon}
                builder={imageUrlBuilder}
                alt={name}
              />
              <span>{name}</span>
            </a>
          </Link>
        ))}
      </ul>
    </Container>
  );
};
