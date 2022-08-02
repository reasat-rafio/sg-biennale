import { HamburgerMenu } from "@components/icons/hamburger-menu";
import { Container } from "@components/ui/container";
import { ISite } from "@lib/@types/global.types";
import { imageUrlBuilder } from "@utils/sanity";
import Link from "next/link";
import { SanityImg } from "sanity-react-extra";

interface NavHeaderProps {
  logo: ISite["site"]["logo"];
  date: ISite["site"]["date"];
}

export const NavHeader: React.FC<NavHeaderProps> = ({ logo, date }) => {
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

        <div className="flex justify-around items-center | ml-auto space-x-20 | lg:text-[16px] md:text-lg text-base font-semibold font-manrope">
          <span className=" text-right">{date}</span>
          <Link href={""}>
            <a>Programmes & Events</a>
          </Link>
          <HamburgerMenu />
        </div>
      </div>
    </Container>
  );
};
