import { ArrowNarrowLeft } from "@components/icons/arrow-narrow-left";
import Link from "next/link";

export const GoBack: React.FC<{ title: string; href: string }> = ({
  title,
  href,
}) => {
  return (
    <div className="flex">
      <Link href={href} prefetch={false}>
        <a className="flex items-center | space-x-2 | text-sm | border-t border-black">
          <ArrowNarrowLeft />
          <span> {title}</span>
        </a>
      </Link>
    </div>
  );
};
