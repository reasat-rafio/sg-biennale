import { AnimatedHeader } from "@components/ui/animated-component/animated-header";
import { Container } from "@components/ui/container";
import { TeamCollection } from "@lib/@types/about.types";
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
  return (
    <section className="py-section overflow-clip">
      <Container type="section">
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
      </Container>
      <TeamCarousel teamCollection={teamCollection} />
    </section>
  );
};
