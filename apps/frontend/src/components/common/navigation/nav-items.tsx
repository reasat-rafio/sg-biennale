import { HamburgerMenu } from "@components/icons/hamburger-menu";
import { Container } from "@components/ui/container";
import { Cta } from "@lib/@types/global.types";
import { imageUrlBuilder } from "@utils/sanity";
import Link from "next/link";
import { SanityImg } from "sanity-react-extra";

interface NavItemsProps {
  ctas: Cta[];
}

export const NavItems: React.FC<NavItemsProps> = ({ ctas }) => {
  return (
    <Container className="flex items-center| py-5">
      <div className="flex flex-1 | lg:space-x-4 space-x-2">
        {ctas.map(({ _key, title, href, icon }) => (
          <Link href={href} key={_key}>
            <a className="flex space-x-2 items-center">
              <figure className="w-4 h-4">
                <SanityImg
                  className="h-full w-full object-contain"
                  image={icon}
                  builder={imageUrlBuilder}
                  width={100}
                  alt="icon"
                />
              </figure>
              <span>{title}</span>
            </a>
          </Link>
        ))}
      </div>
      <HamburgerMenu />
    </Container>
  );
};
