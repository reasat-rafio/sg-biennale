import { ISite } from "@lib/@types/global.types";
import { NavHeader } from "./nav-header";
import { NavItems } from "./nav-items";
import React from "react";

export const Navbar: React.FC<ISite["site"]> = ({
  date,
  logo,
  navigations: { heightlights, menu },
}) => {
  const [highLightedMenu] = menu.filter((m) => m.highLight);

  return (
    <nav id="navbar" className="lg:sticky top-0 left-0 z-40 bg-white">
      <NavHeader date={date} logo={logo} highLightedMenu={highLightedMenu} />
      {/* <NavItems heightlights={heightlights} menu={menu} /> */}
    </nav>
  );
};
