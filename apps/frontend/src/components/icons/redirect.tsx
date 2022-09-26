import { RedirectIconVariant } from "@lib/helpers/nav-dropdown.helpers";
import { motion } from "framer-motion";

interface RedirectProps {
  triggerAnimation: boolean;
}

export const RedirectIcon: React.FC<RedirectProps> = ({ triggerAnimation }) => {
  return (
    <motion.svg
      width="24"
      height="24"
      initial="initial"
      animate={triggerAnimation ? "enter" : "exit"}
      variants={RedirectIconVariant}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="12" fill="#176100" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.54997 8H15.55C15.9795 8 16.3277 8.34822 16.3277 8.77778V15.7778H15.55H14.7722V10.6555L9.09994 16.3278L8 15.2278L13.6722 9.55556H8.54997L8.5498 8.77778L8.54997 8Z"
        fill="#FEFEFE"
      />
    </motion.svg>
  );
};
