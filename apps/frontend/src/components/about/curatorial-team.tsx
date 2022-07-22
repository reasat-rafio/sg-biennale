import { Container } from "@components/ui/container";
import { Header } from "@components/ui/header";
import { TeamCollection } from "@lib/@types/about.types";
import { doTruncate } from "@lib/helpers/global.helpers";
import { useWindowSize } from "@lib/hooks";
import { imageUrlBuilder, PortableText } from "@utils/sanity";
import { useCallback } from "react";
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
  const windowWidth = useWindowSize()?.width ?? 0;

  const descriptionRef = useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      const maxLength = 400;
      const descriptionRefChilds = node.children;
      const textContent = descriptionRefChilds[0].textContent;

      descriptionRefChilds[0].innerHTML = `${doTruncate(
        descriptionRefChilds[0].textContent as string,
        maxLength
      )} ${(textContent?.length as number) > maxLength ? "..." : ""}`;
    }
  }, []);

  return (
    <Container type="section" className="py-section">
      <Header>{header}</Header>
      <div className="grid grid-cols-12 | gap-4 mt-8">
        {teamCollection.map(({ _key, name, description, images }) => (
          <div
            key={_key}
            className=" flex flex-col space-y-4 | col-span-12 md:col-span-4 lg:col-span-3"
          >
            <div className="flex | justify-center items-center | overflow-hidden">
              <SanityImg
                width={windowWidth >= 768 ? 400 : 200}
                className="xl:h-[305px] xl:w-[305px] h-auto w-auto | object-cover rounded-full"
                image={images[0]}
                builder={imageUrlBuilder}
                alt={`${name}'s image`}
              />
            </div>
            <div className="flex flex-col space-y-4">
              <h6 className="text-lg font-medium">{name}</h6>
              <div ref={descriptionRef} className="text-base">
                <PortableText blocks={description} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};
