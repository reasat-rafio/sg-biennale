import { AnimatedHeader } from "@components/ui/animated-component/animated-header";
import { Container } from "@components/ui/container";
import { Header } from "@components/ui/header";
import { TeamCollection } from "@lib/@types/about.types";
import { usePortableTextTruncate, useWindowSize } from "@lib/hooks";
import { imageUrlBuilder, PortableText } from "@utils/sanity";
import Link from "next/link";
import { SanityImg } from "sanity-react-extra";
import { TeamCarousel } from "./team-carousel";

interface CuratorialTeamProps {
  type: string;
  headers: string[];
  teamCollection: TeamCollection[];
}

export const CuratorialTeam: React.FC<CuratorialTeamProps> = ({
  headers,
  teamCollection,
}) => {
  // const windowWidth = useWindowSize()?.width ?? 0;
  // const [descriptionRef] = usePortableTextTruncate({ maxLength: 400 });

  return (
    <Container type="section" className="py-section ">
      <header>
        {headers.map((text, idx, allText) => (
          <AnimatedHeader
            key={idx + text}
            className="font-semibold xl:text-[138px] lg:text-[110px] md:text-[90px] sm:text-[70px] text-heading-4 | text-[#D9D9D9]"
            lineLength={allText.length}
            header={text}
            idx={idx}
          />
        ))}
      </header>
      <TeamCarousel teamCollection={teamCollection} />
    </Container>
  );
};
