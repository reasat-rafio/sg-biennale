import { MoreInfo } from "@lib/@types/visitor-info.types";
import Link from "next/link";
import clsx from "clsx";
import { SanityImg } from "sanity-react-extra";
import { imageUrlBuilder } from "@utils/sanity";
import { useWindowSize } from "@lib/hooks";

interface MoreInfoBlockProps {
  moreInfo: MoreInfo;
  className?: string;
}

export const MoreInfoBlock: React.FC<MoreInfoBlockProps> = ({
  moreInfo: { title, icon, description, cta, image },
  className,
}) => {
  const windowWidth = useWindowSize()?.width ?? 0;

  return (
    <div className={clsx(className, "flex flex-col | space-y-5")}>
      {image && (
        <div className="lg:h-[350px] h-auto">
          <SanityImg
            className="h-full w-full object-cover"
            height={windowWidth >= 768 ? 700 : 450}
            image={image}
            builder={imageUrlBuilder}
            alt={title}
          />
        </div>
      )}
      <h6 className="text-xl font-semibold | mr-auto py-1">{title}</h6>
      <p className="text-lg whitespace-pre-wrap">{description}</p>
      {cta?.href && (
        <Link href={cta?.href ?? "/"}>
          <a className="flex | border border-black | mr-auto px-2 py-1 | text-sm | rounded-3xl">
            {cta?.title}
          </a>
        </Link>
      )}
    </div>
  );
};
