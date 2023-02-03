import { PortableText } from "@utils/sanity";
import { useEffect, useLayoutEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePortableTextTruncate } from "@lib/hooks";

interface TickerProps {
  ticker: any[];
}
export const Ticker: React.FC<TickerProps> = ({ ticker }) => {
  const [ref] = usePortableTextTruncate({ maxLength: 250 });
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [showTicker, setShowTicker] = useState<boolean>(true);
  const totalAlphaLength = ticker
    .map((e) => e.children.map((c: any) => c?.text?.trim()).join("").length)
    .reduce((a, b) => a + b, 0);

  const onCloseAction = () => setShowTicker(false);
  const getNavbarHeight = () => {
    const height = document.getElementById("navbar")?.clientHeight ?? 0;
    setNavbarHeight(height);
  };

  useLayoutEffect(() => {
    getNavbarHeight();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", getNavbarHeight);
    window.addEventListener("resize", getNavbarHeight);
    return () => {
      window.removeEventListener("scroll", getNavbarHeight);
      window.removeEventListener("resize", getNavbarHeight);
    };
  }, []);

  return (
    <AnimatePresence>
      {showTicker && totalAlphaLength > 0 && (
        <motion.aside
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ top: `${navbarHeight}px` }}
          className="fixed w-full z-10 | flex items-center | max-w-[1920px] | 2xl:px-max xl:px-xxl lg:px-x sm:px-lg px-md mx-auto py-1 space-x-1 | bg-black | text-white sm:text-sm text-sm"
        >
          <div className="flex-1">
            <PortableText blocks={ticker} />
          </div>
          <button onClick={onCloseAction}>
            <XRoundedIcon />
          </button>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

const XRoundedIcon: React.FC<{}> = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-7 h-7"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};
