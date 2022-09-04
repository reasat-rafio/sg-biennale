import { Button } from "@components/ui/button";
import { Cta } from "@lib/@types/global.types";
import { imageUrlBuilder } from "@utils/sanity";
import { SanityImage, SanityImg } from "sanity-react-extra";

interface InfoAndContactsProps {
  title: string;
  infos: {
    _key?: string;
    label: string;
    value: string;
  }[];
}
interface KitsInfoProps {
  header: string;
  description: string;
  image: SanityImage;
  cta: Cta;
  infoAndContacts: InfoAndContactsProps;
}

export const KitsInfo: React.FC<KitsInfoProps> = ({
  header,
  description,
  image,
  cta,
  infoAndContacts,
}) => {
  return (
    <section className="grid grid-cols-12 | xl:pb-14 xl:px-0 lg:px-x sm:px-lg px-md 2xl:pt-max lg:pt-xl pt-section">
      <div className="col-span-12 lg:col-span-6 xl:col-span-5 | grid grid-rows-6 | xl:pr-20 lg:pr-10">
        <Header header={header} description={description} cta={cta} />
        <InfoAndContacts {...infoAndContacts} />
      </div>
      <figure className="col-span-12 lg:col-span-6 xl:col-span-7 | flex justify-center items-center max-h-[700px]">
        <SanityImg
          className="h-full w-full object-cover"
          width={1080}
          image={image}
          builder={imageUrlBuilder}
        />
      </figure>
    </section>
  );
};

const Header: React.FC<{
  header: string;
  description: string;
  cta: Cta;
}> = ({ header, description, cta }) => {
  return (
    <div className="row-span-4 | flex flex-col justify-center | border-b | space-y-4 xl:pl-max py-5">
      <h2 className="text-red-love font-medium xl:text-heading-4 text-heading-5">
        {header}
      </h2>
      <p className="font-manrope text-body-2 text-gray--700">{description}</p>
      <div className="xl:pt-9 pt-5">
        <Button
          variant="secondary"
          type="href"
          href={cta?.href}
          icon={
            <SanityImg
              className="w-[14px] h-[13px]"
              width={14}
              image={cta.icon}
              builder={imageUrlBuilder}
              alt="download icon"
            />
          }
        >
          {cta.title}
        </Button>
      </div>
    </div>
  );
};

const InfoAndContacts: React.FC<InfoAndContactsProps> = ({ infos, title }) => {
  return (
    <div className="row-span-2 | flex flex-col justify-center py-5 | xl:pl-max space-y-4 | font-manrope">
      <h6 className="text-body-1 font-semibold">{title}</h6>
      <ul>
        {infos.map(({ _key, label, value }) => (
          <li
            className="grid sm:grid-cols-2 grid-cols-1 | mt-2 | text-body-2"
            key={_key}
          >
            <span>{label}</span>
            <span>{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
