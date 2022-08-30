import { ISite } from "@lib/@types/global.types";
import { imageUrlBuilder } from "@utils/sanity";
import { SanityImg } from "sanity-react-extra";
import { Address } from "./address";
import { NewsLetter } from "./news-letter";

export const Footer: React.FC<ISite["site"]> = ({
  date,
  footer: { header, image, location, newsLetter, social },
}) => {
  return (
    <footer id="footer" className="grid grid-cols-12 | gap-10">
      <section className="flex flex-col justify-center items-center col-span-12 lg:col-span-6  xl:col-span-5 | lg:pl-32 pl-6 xl:space-y-20 ">
        <header className="w-full | font-semibold">
          <h2 className=" mb-4 | whitespace-pre-wrap | xl:text-[56px] leading-[71px]">
            {header}
          </h2>
          <h6 className="font-manrope"> {date}</h6>
        </header>
        <NewsLetter {...newsLetter} />
        <Address social={social} location={location} />
      </section>

      <figure className="col-span-12 lg:col-span-6 xl:col-span-7 | max-h-[1000px] relative">
        <SanityImg
          className="h-full w-full object-cover "
          width={1080}
          image={image}
          builder={imageUrlBuilder}
          alt={`${header}' image`}
        />
        <span className="bg_fadede_gradient_y | absolute top-0 left-0 h-full w-full" />
      </figure>
    </footer>
  );
};
