import { ShortGuide } from "@lib/@types/visitor-info.types";
import { imageUrlBuilder } from "@utils/sanity";
import { SanityImg } from "sanity-react-extra";

interface HeroProps {
  type: string;
  header: string;
  shortGuide: ShortGuide;
}

export const Hero: React.FC<HeroProps> = ({
  header,
  shortGuide: { asset, icon, title },
}) => {
  return (
    <header className="flex">
      <h1 className="flex-1 | text-2xl font-semibold">{header}</h1>
      <div
        className="flex items-center | space-x-2 py-2 | border-t-2 border-black | cursor-pointer"
        onClick={() => {
          if (typeof window !== "undefined") window.open(asset.url);
        }}
      >
        <SanityImg
          width={20}
          image={icon}
          builder={imageUrlBuilder}
          alt={`${title}'s icon`}
        />
        <span>{title}</span>
      </div>
    </header>
  );
};
