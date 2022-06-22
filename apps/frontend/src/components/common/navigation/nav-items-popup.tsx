import { Calender } from "@components/icons/calender";
import { Download } from "@components/icons/download";
import { Mail } from "@components/icons/mail";
import { X } from "@components/icons/x";
import { ISite } from "@lib/@types/global.types";
import Link from "next/link";

interface NavItemsPopupProps {
  date: ISite["site"]["date"];
  navigations: ISite["site"]["navigations"];
  styles: string;
}

export const NavItemsPopup: React.FC<NavItemsPopupProps> = ({
  date,
  navigations,
  styles,
}) => {
  return (
    <div className="absolute top-0 right-0 py-5 lg:px-14 px-6 bg-white text-black shadow flex flex-col space-y-7">
      <span className={styles}>{date}</span>
      <div className="flex space-x-4 w-full justify-between">
        <button className="flex border border-black rounded-3xl p-3 space-x-1">
          <Calender />
          <span>Programmes & Events</span>
        </button>
        <button>
          <X />
        </button>
      </div>
      <ul className="flex flex-col space-y-2 text-xl font-medium">
        {navigations.menu.map(({ key, slug, title }) => (
          <li key={key}>
            <Link href={`/${slug.current}`}>
              <a>{title}</a>
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex justify-between space-x-2 text-sm">
        <div className="flex space-x-2 border-t border-black p-2">
          <Download />
          <span>Short Guide</span>
        </div>
        <div className="flex space-x-2 border-t border-black p-2">
          <Mail />
          <span>Subscribe</span>
        </div>
      </div>
    </div>
  );
};
