import { Container } from "@components/ui/container";
import { ISite } from "@lib/@types/global.types";
import { imageUrlBuilder } from "@utils/sanity";
import Link from "next/link";
import { SanityImg } from "sanity-react-extra";

interface NavItemsProps {
  menu: ISite["site"]["navigations"]["menu"];
}

export const NavItems: React.FC<NavItemsProps> = ({ menu }) => {
  return (
    <Container className="flex items-center md:flex-row flex-col | py-5 space-y-2 lg:space-y-0 | text-lg font-medium | border-black border-y-2">
      <div className="flex flex-1 flex-wrap lg:justify-start justify-center | lg:space-x-4 space-x-2">
        {menu.map(({ _key, title, slug }) => (
          <Link href={`/${slug.current}`} key={_key}>
            <a>{title}</a>
          </Link>
        ))}
      </div>
    </Container>
  );
};
