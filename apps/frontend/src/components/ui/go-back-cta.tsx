import { ArrowNarrowLeft } from "@components/icons/arrow-narrow-left";
import Link from "next/link";

export const GoBack: React.FC<{ title: string; href: string }> = ({
  title,
  href,
}) => {
  return (
    <div className="flex">
      <Link href={href}>
        <a className="flex text-sm space-x-2 items-center border-t border-black">
          <ArrowNarrowLeft />
          <span> {title}</span>
        </a>
      </Link>
    </div>
  );
};
