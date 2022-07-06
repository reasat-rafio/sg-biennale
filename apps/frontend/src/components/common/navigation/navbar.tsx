import { ISite } from "@lib/@types/global.types";
import { NavHeader } from "./nav-header";
import { NavItems } from "./nav-items";

export const Navbar: React.FC<ISite["site"]> = ({
  date,
  logo,
  navigations: { heightlights, menu },
}) => {
  return (
    <nav id="navbar" className="sticky top-0 left-0 z-40 bg-white">
      <NavHeader date={date} logo={logo} />
      <NavItems heightlights={heightlights} menu={menu} />
    </nav>
  );
};
