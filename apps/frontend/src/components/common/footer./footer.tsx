import { Container } from "@components/ui/container";
import { ISite } from "@lib/@types/global.types";
import { Address } from "./address";
import { NewsLetter } from "./news-letter";

export const Footer: React.FC<ISite["site"]> = ({
  date,
  footer: { header, location, newsLetter, social },
}) => {
  return (
    <footer className="bg-[#FFFFFF] py-xl" id="footer">
      <Container>
        <div className="grid grid-cols-12 | xl:pb-28 md:pb-20 pb-14 md:space-y-0 space-y-10 | border-b-2 border-black">
          <div className="col-span-12 md:col-span-6 max-w-lg | font-semibold">
            <h4 className="mb-4 | text-left | whitespace-pre-wrap | xl:text-heading-4 text-heading-5 md:text-heading-6">
              {header}
            </h4>
            <span className="font-manrope xl:text-body-1 text-body-2">
              {date}
            </span>
          </div>
          <div className="relative | col-span-12 md:col-span-6">
            <NewsLetter {...newsLetter} />
          </div>
        </div>
        <div className="pt-10">
          <Address location={location} social={social} />
        </div>
      </Container>
    </footer>
  );
};
