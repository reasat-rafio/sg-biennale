import { Calender } from "@components/icons/calender";
import { HamburgerMenu } from "@components/icons/hamburger-menu";
import { Container } from "@components/ui/container";
import { ISite } from "@lib/@types/global.types";
import { imageUrlBuilder } from "@utils/sanity";
import { useState } from "react";
import { SanityImg } from "sanity-react-extra";
import { NavItemsPopup } from "./nav-items-popup";

const styles = {
  date: "lg:text-2xl md:text-lg text-base font-medium ml-auto",
};

export const Navbar: React.FC<ISite["site"]> = ({
  date,
  logo,
  navigations,
}) => {
  const [showNavigationItems, setShowNavigationItems] = useState(false);

  return (
    <Container
      id="navbar"
      className="bg-black sticky top-0 left-0 py-4 z-40 text-white"
    >
      <nav className="flex space-x-3">
        <div className="flex-1">
          <SanityImg
            image={logo}
            builder={imageUrlBuilder}
            width={150}
            alt="singapore biennale 2022 logo"
          />
        </div>

        <div className="flex flex-col justify-around">
          <span className={styles.date}>{date}</span>
          <div className="flex space-x-2 ml-auto">
            <button>
              <Calender />
            </button>
            <button
              onClick={() => setShowNavigationItems((prevState) => !prevState)}
            >
              <HamburgerMenu />
            </button>
          </div>
        </div>
      </nav>

      {/*  */}
      {showNavigationItems && (
        <NavItemsPopup
          styles={styles.date}
          date={date}
          navigations={navigations}
          setShowNavigationItems={setShowNavigationItems}
        />
      )}
    </Container>
  );
};
