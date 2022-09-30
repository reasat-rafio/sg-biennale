import { Container } from "@components/ui/container";
import { imageUrlBuilder } from "@utils/sanity";
import Link from "next/link";
import { SanityImg, SanityImage } from "sanity-react-extra";

interface NavHeaderProps {
  logo: SanityImage;
  eventLogo: SanityImage;
}

export const NavHeader: React.FC<NavHeaderProps> = ({ logo, eventLogo }) => {
  return (
    <Container className="py-3 relative z-40 ">
      <div className="flex items-center | space-x-3">
        <div className="flex-1">
          <figure className="w-fit">
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

        <figure className="w-fit">
          <SanityImg
            className="max-h-[65px]"
            image={eventLogo}
            builder={imageUrlBuilder}
            width={150}
            alt="natasha biennale 2022 logo"
          />
        </figure>
      </div>
    </Container>
  );
};
