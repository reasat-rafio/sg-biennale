import { MoreInfo } from "@lib/@types/visitor-info.types";
import Link from "next/link";
import clsx from "clsx";

interface MoreInfoBlockProps {
  moreInfo: MoreInfo;
  className?: string;
}

export const MoreInfoBlock: React.FC<MoreInfoBlockProps> = ({
  moreInfo: { title, icon, description, cta },
  className,
}) => {
  return (
    <div className={clsx(className, "flex flex-col | space-y-5")}>
      <h6 className="text-xl font-semibold | mr-auto py-1">{title}</h6>
      <p className="text-lg">{description}</p>
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
