import { Container } from "@components/ui/container";
import { Header } from "@components/ui/header";
import { TeamCollection } from "@lib/@types/about.types";
import { imageUrlBuilder } from "@utils/sanity";
import { SanityImg } from "sanity-react-extra";

interface CuratorialTeamProps {
  type: string;
  header: string;
  teamCollection: TeamCollection[];
}

export const CuratorialTeam: React.FC<CuratorialTeamProps> = ({
  header,
  teamCollection,
}) => {
  return (
    <Container type="section" className="py-section">
      <Header>{header}</Header>
      <div className="grid grid-cols-12 | gap-4 mt-8">
        {teamCollection.map(({ _key, name, description, image }) => (
          <div
            key={_key}
            className=" flex flex-col space-y-4 | col-span-12 md:col-span-4 lg:col-span-3"
          >
            <div className="flex | justify-center items-center | overflow-hidden">
              <SanityImg
                width={305}
                className="h-[305px] | object-cover rounded-full"
                image={image}
                builder={imageUrlBuilder}
                alt={`${name}'s image`}
              />
            </div>
            <div className="flex flex-col space-y-4">
              <h6 className="text-lg font-medium">{name}</h6>
              <p className="text-base">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};
