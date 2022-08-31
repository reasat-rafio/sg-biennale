import { ISite } from "@lib/@types/global.types";
import { useWindowSize } from "@lib/hooks";
import { imageUrlBuilder } from "@utils/sanity";
import clsx from "clsx";
import { SanityImg } from "sanity-react-extra";
import { Address } from "./address";
import { NewsLetter } from "./news-letter";
import Styles from "@styles/foooter.module.css";

export const Footer: React.FC<ISite["site"]> = ({
  date,
  footer: { header, image, location, newsLetter, social },
}) => {
  const windowWidth = useWindowSize()?.width ?? 0;

  return (
    <footer
      id="footer"
      className="relative | grid grid-cols-12 | xl:pb-14 xl:px-0 lg:px-x sm:px-lg px-md"
    >
      <section className="relative z-10 | flex flex-col justify-center items-center col-span-12 lg:col-span-6  xl:col-span-5 |  xl:space-y-20 xl:pl-[112px]">
        <header className="w-full | font-semibold">
          <h2 className=" mb-4 | whitespace-pre-wrap | xl:text-[56px] leading-[71px]">
            {header}
          </h2>
          <h6 className="font-manrope"> {date}</h6>
        </header>
        <NewsLetter {...newsLetter} />
        <Address social={social} location={location} />
      </section>

      <figure className="relative | col-span-12 lg:col-span-6 xl:col-span-7 | flex justify-center items-center">
        <SanityImg
          className="w-2/3 object-cover z-10 relative"
          width={1080}
          image={image}
          builder={imageUrlBuilder}
          alt={`${header}' image`}
        />
      </figure>

      {/* Background */}
      <div className="bg-[url('/bg/footer-background-decor.svg')] h-full w-full absolute top-0 left-0 bg-repeat" />
      {/* Faded gardient */}
      <span
        className={clsx(
          "absolute top-0 left-0 h-full w-full",
          windowWidth > 1024
            ? Styles.footer_bg_gradient_left_to_right
            : Styles.footer_bg_gradient_top_to_bottom
        )}
      />
    </footer>
  );
};
