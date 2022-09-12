import { AnimatedHeader } from "@components/ui/animated-component/animated-header";
import { Container } from "@components/ui/container";
import { Header } from "@components/ui/header";
import { TeamCollection } from "@lib/@types/about.types";
import { usePortableTextTruncate, useWindowSize } from "@lib/hooks";
import { imageUrlBuilder, PortableText } from "@utils/sanity";
import Link from "next/link";
import { SanityImg } from "sanity-react-extra";

interface CuratorialTeamProps {
  type: string;
  headers: string[];
  teamCollection: TeamCollection[];
}

export const CuratorialTeam: React.FC<CuratorialTeamProps> = ({
  headers,
  // teamCollection,
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
      {/* <div className="grid grid-cols-12 | gap-4 mt-8">
        {teamCollection.map(({ _key, name, description, images, slug }) => (
          <article
            key={_key}
            className=" flex flex-col space-y-4 | col-span-12 md:col-span-4 lg:col-span-3"
          >
            <figure className="flex | justify-center items-center | overflow-hidden">
              <SanityImg
                width={windowWidth >= 768 ? 600 : 350}
                className="xl:h-[305px] xl:w-[305px] h-auto w-auto | object-cover rounded-full"
                image={images[0]}
                builder={imageUrlBuilder}
                alt={`${name}'s image`}
              />
            </figure>
            <section className="flex flex-col space-y-4">
              <h6 className="text-lg font-medium">{name}</h6>
              <div ref={descriptionRef} className="text-base">
                <PortableText blocks={description} />
              </div>

              <Link href={`/directors/${slug.current}`}>
                <a>Read More</a>
              </Link>
            </section>
          </article>
        ))}
      </div> */}
    </Container>
  );
};
