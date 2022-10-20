import { Container } from "@components/ui/container";
import { imageUrlBuilder } from "@utils/sanity";
import Link from "next/link";
import { SanityImage, SanityImg } from "sanity-react-extra";
import { motion } from "framer-motion";

export interface InformationProps {
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
    <Container className="flex lg:flex-row flex-col items-center | md:py-2 py-3 md:space-x-5 lg:space-y-0 space-y-2  | border-b-2 border-black text-body-2">
      <div className="flex flex-1 sm:flex-row flex-col items-center | md:space-x-4 space-x-1">
        <SanityImg
          image={address.icon}
          width={12}
          builder={imageUrlBuilder}
          alt="location icon"
        />
        <span className="text-center">{address.address}</span>
      </div>
      <ul className="flex flex-wrap items-center sm:justify-start justify-center space-x-4">
        {socials.map(({ _key, icon, url, name }) => (
          <Link href={url} passHref key={_key}>
            <motion.a
              whileHover={{
                scale: 1.05,
              }}
              transition={{ damping: 2 }}
              className="flex | space-x-2 items-center cursor-pointer"
            >
              <figure className="w-4 h-4">
                <SanityImg
                  className="h-full w-full object-contain"
                  image={icon}
                  builder={imageUrlBuilder}
                  width={5}
                  alt="icon"
                />
              </figure>
              <span className="sm:block hidden">{name}</span>
            </motion.a>
          </Link>
        ))}
      </ul>
    </Container>
  );
};
