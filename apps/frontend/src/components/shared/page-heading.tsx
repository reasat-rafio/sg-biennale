import { SlideupLettersAnimation } from "@components/ui/animated-component/slideup-letters-animation";
import { Header } from "@components/ui/header";
import clsx from "clsx";
import { motion, Variants } from "framer-motion";

export interface PageHeaderProps {
  heading: string;
  tagline: string;
  color?: string;
  position?: "center" | "default";
}

export const AnimationDuration = 0.3;
export const DescriptionVariants: Variants = {
  initial: { opacity: 0 },
  animate: (delay: number) => ({
    opacity: 1,
    transition: {
      delay,
      ease: "easeInOut",
      type: "tween",
      duration: AnimationDuration,
    },
  }),
};

export const PageHeading: React.FC<PageHeaderProps> = ({
  heading,
  tagline,
  color = "#F3F2EC",
  position = "default",
}) => {
  const letters = Array.from(heading);
  const headerAnimationDuration = (letters.length - 1) * 0.1 + 0.7;

  return (
    <header
      className={clsx(
        "flex flex-col space-y-3 | xl:pt-xl md:pt-x pt-lg",
        position === "center" && "justify-center items-center",
        position === "default" && "justify-start items-start"
      )}
    >
      <Header type="h1">
        <SlideupLettersAnimation>{heading}</SlideupLettersAnimation>
      </Header>
      <motion.h4
        initial="initial"
        animate="animate"
        variants={DescriptionVariants}
        custom={headerAnimationDuration}
        className={clsx(
          "max-w-2xl | text-gray--700 text-body-1 font-manrope | pb-4",
          position === "center" && "text-center",
          position === "default" && "text-left"
        )}
      >
        {tagline}
      </motion.h4>
      <motion.span
        initial="initial"
        animate="animate"
        variants={DescriptionVariants}
        custom={headerAnimationDuration + AnimationDuration}
        style={{ background: color }}
        className="h-[6px] w-[235px]"
      />
    </header>
  );
};
