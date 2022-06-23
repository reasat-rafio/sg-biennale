import { Facebook } from "@components/icons/facebook";
import { Instagram } from "@components/icons/instagram";
import { Location } from "@components/icons/location";
import { Container } from "@components/ui/container";
import { ISite } from "@lib/@types/global.types";

export const Footer: React.FC<ISite["site"]> = ({
  date,
  footer: { address, copyRight, socials },
}) => {
  return (
    <Container className="bg-zinc-500 py-6">
      <footer className="grid lg:grid-cols-11 grid-cols-6 text-white lg:gap-6 gap-2 text-sm lg:text-base">
        <div className="sm:col-span-3 col-span-6 flex lg:flex-col lg:space-y-4 lg:space-x-0 space-x-2">
          <span className="font-semibold ">{copyRight}</span>
          <span>Natasha</span>
        </div>
        <span className="sm:col-span-3 col-span-6 text-lg">{date}</span>
        <div className="lg:col-span-3 col-span-4 flex space-x-1">
          <Location />
          <address className="font-medium not-italic">{address}</address>
        </div>
        <div className="col-span-2 flex justify-around">
          <Facebook />
          <Instagram />
        </div>
      </footer>
    </Container>
  );
};
