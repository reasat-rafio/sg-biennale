import { FooterNewsLetter } from "@lib/@types/global.types";
import { useRef } from "react";

export const NewsLetter: React.FC<FooterNewsLetter> = ({
  title,
  placeholder,
  ctaButton,
}) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);

  return (
    <section className="w-full | pb-9 | font-semibold">
      <div className="mb-4 lg:text-left text-center">{title}</div>
      <form className="relative flex | px-5 py-3  | border__round">
        <input
          className="flex-1 | pl-3 | bg-transparent outline-none placeholder:text-sm"
          placeholder={placeholder}
          type="text"
        />
        <button
          ref={btnRef}
          type="submit"
          className="absolute right-5 top-0 h-full"
        >
          {ctaButton.title}
        </button>
      </form>
    </section>
  );
};
