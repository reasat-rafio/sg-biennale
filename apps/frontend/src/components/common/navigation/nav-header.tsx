import { Container } from "@components/ui/container";
import { ISite } from "@lib/@types/global.types";
import { imageUrlBuilder } from "@utils/sanity";
import { SanityImg } from "sanity-react-extra";

interface NavHeaderProps {
  logo: ISite["site"]["logo"];
  date: ISite["site"]["date"];
}

export const NavHeader: React.FC<NavHeaderProps> = ({ logo, date }) => {
  return (
    <Container className="py-4">
      <div className="flex space-x-3 items-center">
        <div className="flex-1">
          <SanityImg
            image={logo}
            builder={imageUrlBuilder}
            width={150}
            alt="singapore biennale 2022 logo"
          />
        </div>

        <div className="flex flex-col justify-around lg:text-2xl md:text-lg text-base ml-auto font-semibold">
          <div className="flex space-x-2 ml-auto">Natasha</div>
          <span className="whitespace-pre-wrap text-right">{date}</span>
        </div>
      </div>
    </Container>
  );
};
