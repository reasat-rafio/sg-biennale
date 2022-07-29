import { Container } from "@components/ui/container";
import { Header } from "@components/ui/header";
import { Cta } from "@lib/@types/global.types";
import { PortableText } from "@utils/sanity";
import Link from "next/link";

interface KitsInfoProps {
  header: string;
  details: {
    title: string;
    description: string;
    cta: Cta;
  };
  infoAndContacts: {
    title: string;
    contacts: any[];
  };
}

export const KitsInfo: React.FC<KitsInfoProps> = ({
  details,
  header,
  infoAndContacts,
}) => {
  return (
    <Container type="section" className="!max-w-4xl py-section">
      <Header>{header}</Header>
      <div className="flex flex-col | space-y-5 mt-7">
        <div className="flex flex-col items-start | space-y-4">
          <h6 className="text-xl font-medium">{details.title}</h6>
          <p className="text-lg">{details.description}</p>

          <Link href={details.cta.href}>
            <a className="px-4 py-1 my-3 | border-black border-2 | rounded-3xl text-xl">
              {details.cta.title}
            </a>
          </Link>
        </div>
        <div className="flex flex-col items-start | space-y-4">
          <h6 className="text-lg font-medium">{infoAndContacts.title}</h6>
          <address className="text-base">
            <PortableText blocks={infoAndContacts.contacts} />
          </address>
        </div>
      </div>
    </Container>
  );
};
