import { Container } from "@components/ui/container";
import { ISite } from "@lib/@types/global.types";
import Link from "next/link";
import { useRef } from "react";

interface FooterCtaProps {
  menu: ISite["site"]["footer"]["menu"];
}

export const FooterCta: React.FC<FooterCtaProps> = ({ menu }) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);

  return (
    <Container className="flex items-center lg:flex-row flex-col | py-5 | border-y-2 border-black">
      <div className="flex flex-1 flex-wrap lg:justify-start justify-center | lg:space-x-4 space-x-2 | font-medium ">
        {menu.map(({ _key, title, slug }) => (
          <Link key={_key} href={`/${slug.current}`}>
            <a>{title}</a>
          </Link>
        ))}
      </div>
      <form className="relative lg:w-[600px] w-full | flex |  py-1 | border-2 border-black | rounded-3xl">
        <input
          className="flex-1 | pl-3 | bg-transparent outline-none"
          placeholder="Email"
          type="text"
          style={{ marginRight: `${btnRef.current?.clientWidth! + 10}px` }}
        />
        <button
          ref={btnRef}
          className="absolute right-0 top-0 h-full | px-4 | text-lg | border-l-2 border-black | rounded-3xl"
        >
          Subscribe
        </button>
      </form>
    </Container>
  );
};
