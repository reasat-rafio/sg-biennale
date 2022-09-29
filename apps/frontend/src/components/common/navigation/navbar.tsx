import { ISite } from "@lib/@types/global.types";
import { NavHeader } from "./nav-header";
import React from "react";

export const Navbar: React.FC<ISite["site"]> = ({ date, logo,eventLogo }) => {
  return (
    <nav id="navbar" className="lg:sticky top-0 left-0 z-50 bg-white">
      <NavHeader date={date} logo={logo} eventLogo={eventLogo} />
      {/* <NavItems heightlights={heightlights} menu={menu} /> */}
    </nav>
  );
};
