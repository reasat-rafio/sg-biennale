import { Facebook } from "@components/icons/facebook";
import { Instagram } from "@components/icons/instagram";
import { Location } from "@components/icons/location";
import { Container } from "@components/ui/container";
import { ISite } from "@lib/@types/global.types";
import { imageUrlBuilder } from "@utils/sanity";
import Link from "next/link";
import { useRef } from "react";
import { SanityImg } from "sanity-react-extra";

export const Footer: React.FC<ISite["site"]> = ({
  footer: { address, socials, menu },
}) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);

  return (
    <footer id="footer">
      <Container className="py-5 border-y-2 border-black flex items-center lg:flex-row flex-col ">
        <div className="flex lg:space-x-4 space-x-2 flex-1 flex-wrap lg:justify-start justify-center font-medium ">
          {menu.map(({ _key, title, slug }) => (
            <Link key={_key} href={`/${slug.current}`}>
              <a>{title}</a>
            </Link>
          ))}
        </div>
        <div className="">
          <form className="lg:w-[600px] w-auto flex relative rounded-3xl border-2 border-black py-1">
            <input
              className="flex-1 bg-transparent outline-none pl-3"
              placeholder="Email"
              type="text"
              style={{ marginRight: `${btnRef.current?.clientWidth! + 10}px` }}
            />
            <button
              ref={btnRef}
              className="absolute right-0 top-0 rounded-3xl border-l-2 border-black px-4 h-full text-lg"
            >
              Subscribe
            </button>
          </form>
        </div>
      </Container>
      <Container className="py-3 flex items-center lg:flex-row flex-col ">
        <div className="flex flex-1 space-x-1">
          <Location />
          <span>{address}</span>
        </div>
        <div className="flex space-x-2">
          {socials.map(({ _key, icon, url }) => (
            <Link key={_key} href={url}>
              <a>
                <SanityImg
                  width={22}
                  image={icon}
                  builder={imageUrlBuilder}
                  alt={"social icon"}
                />
              </a>
            </Link>
          ))}
        </div>
      </Container>
    </footer>
  );
};
