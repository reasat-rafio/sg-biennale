import { Container } from "@components/ui/container";
import { OrganisationProps } from "@lib/@types/home.types";
import { imageUrlBuilder } from "@utils/sanity";
import Link from "next/link";
import { SanityImg } from "sanity-react-extra";

export const Organisations: React.FC<OrganisationProps> = ({
  organisations,
}) => {
  return (
    <Container className="grid grid-cols-12 | lg:space-x-5 space-x-2 py-10">
      {organisations.map(({ key, logo, name, title, url }) => (
        <section
          className="flex justify-center items-center md:col-span-4 sm:col-span-6 col-span-12"
          key={key}
        >
          <div className="flex flex-col | space-y-2">
            <span className="text-left">{title}</span>
            <Link href={url}>
              <a title={name} className="">
                <SanityImg
                  image={logo}
                  builder={imageUrlBuilder}
                  width={250}
                  alt={name}
                />
              </a>
            </Link>
          </div>
        </section>
      ))}
    </Container>
  );
};
