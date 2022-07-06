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
    <footer id="footer">
      <Container className="py-3">
        <div className=""></div>
        <div className=""></div>
      </Container>
      <Container className="py-3">
        <div className="">
          <Location />
          <span>{address}</span>
        </div>
        <div className=""></div>
      </Container>
    </footer>
  );
};
