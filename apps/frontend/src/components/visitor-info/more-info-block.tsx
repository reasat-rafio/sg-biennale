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
    <div className={clsx(className, "flex flex-col space-y-5")}>
      <h6 className="text-lg font-medium border-t-2 border-black mr-auto py-1">
        {title}
      </h6>
      <p className="text-sm">{description}</p>
      <button className="flex border border-black mr-auto px-2 py-1 rounded-3xl text-sm">
        <Link href={cta?.href ?? "/"}>
          <a>{cta?.title}</a>
        </Link>
      </button>
    </div>
  );
};