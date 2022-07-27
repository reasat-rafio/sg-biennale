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
    <Container className="flex items-center md:flex-row flex-col | py-5 space-y-2 lg:space-y-0 | text-lg font-medium | border-black border-y-2">
      <div className="flex flex-1 flex-wrap lg:justify-start justify-center | lg:space-x-4 space-x-2">
        {menu.map(({ _key, title, slug }) => (
          <Link href={`/${slug.current}`} key={_key}>
            <a>{title}</a>
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center | lg:space-x-4 space-x-1 space-y-1 lg:space-y-0">
        {heightlights.map(({ _key, icon, title, slug }) => (
          <Link href={slug.current} key={_key}>
            <a className="flex space-x-2 items-center lg:flex-row flex-col | lg:px-4 lg:py-1 py-2 px-2 | border border-black | rounded-3xl ">
              <SanityImg
                width={20}
                builder={imageUrlBuilder}
                image={icon}
                alt={`${title}'s icon`}
              />
              <span className="hidden lg:block | lg:text-xl">{title}</span>
            </a>
          </Link>
        ))}
      </div>
    </Container>
  );
};
