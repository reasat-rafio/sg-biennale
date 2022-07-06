import { Container } from "@components/ui/container";
import { ISite } from "@lib/@types/global.types";
import { imageUrlBuilder } from "@utils/sanity";
import Link from "next/link";
import { SanityImg } from "sanity-react-extra";

interface NavItemsProps {
  menu: ISite["site"]["navigations"]["menu"];
  heightlights: ISite["site"]["navigations"]["heightlights"];
}

export const NavItems: React.FC<NavItemsProps> = ({ menu, heightlights }) => {
  return (
    <Container className="py-5 border-y-2 border-black font-medium text-lg flex items-center md:flex-row flex-col space-y-2 lg:space-y-0">
      <div className="flex lg:space-x-4 space-x-2 flex-1 flex-wrap lg:justify-start justify-center">
        {menu.map(({ _key, title, slug }) => (
          <Link href={`/${slug.current}`} key={_key}>
            <a>{title}</a>
          </Link>
        ))}
      </div>

      <div className="flex lg:space-x-4 space-x-1 space-y-1 lg:space-y-0 flex-wrap items-center justify-center">
        {heightlights.map(({ _key, icon, title }) => (
          <button
            className="border border-black rounded-3xl lg:px-4 lg:py-1 py-2 flex space-x-2 items-center lg:flex-row flex-col"
            key={_key}
          >
            <SanityImg
              width={20}
              builder={imageUrlBuilder}
              image={icon}
              alt={`${title}'s icon`}
            />
            <span className="lg:text-xl">{title}</span>
          </button>
        ))}
      </div>
    </Container>
  );
};