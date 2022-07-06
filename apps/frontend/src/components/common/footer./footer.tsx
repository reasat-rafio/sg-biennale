import { ISite } from "@lib/@types/global.types";
import { FooterCta } from "./footer-cta";
import { FooterDescription } from "./footer-description";

export const Footer: React.FC<ISite["site"]> = ({
  footer: { address, socials, menu },
}) => {
  return (
    <footer id="footer">
      <FooterCta menu={menu} />
      <FooterDescription address={address} socials={socials} />
    </footer>
  );
};
