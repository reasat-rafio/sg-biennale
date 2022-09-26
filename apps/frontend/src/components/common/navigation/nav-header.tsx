import { HamburgerMenu } from "@components/icons/hamburger-menu";
import { Container } from "@components/ui/container";
import { ISite, Menu } from "@lib/@types/global.types";
import { imageUrlBuilder } from "@utils/sanity";
import Link from "next/link";
import { SanityImg } from "sanity-react-extra";

interface NavHeaderProps {
  logo: ISite["site"]["logo"];
  date: ISite["site"]["date"];
  highLightedMenu: Menu;
}

export const NavHeader: React.FC<NavHeaderProps> = ({
  logo,
  date,
  highLightedMenu,
}) => {
  return (
    <Container className="py-3">
      <div className="flex items-center | space-x-3">
        <div className="flex-1">
          <figure className="w-fit ">
            <Link href="/">
              <a>
                <SanityImg
                  className="max-h-[65px]"
                  image={logo}
                  builder={imageUrlBuilder}
                  width={150}
                  alt="singapore biennale 2022 logo"
                />
              </a>
            </Link>
          </figure>
        </div>

        <div className="flex justify-around items-center | ml-auto xl:space-x-20 md:space-x-10 space-x-5 | lg:text-body-1 text-body-2 font-semibold font-manrope">
          <span className="text-right">{date}</span>
          <Link href={`/${highLightedMenu.slug}`}>
            <a>{highLightedMenu.title}</a>
          </Link>
          <HamburgerMenu />
        </div>
      </div>
    </Container>
  );
};
