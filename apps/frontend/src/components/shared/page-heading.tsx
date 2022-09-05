import { SlideupLettersAnimation } from "@components/ui/animated-component/slideup-letters-animation";
import { motion, Variants } from "framer-motion";

export interface PageHeaderProps {
  heading: string;
  tagline: string;
  color?: string;
}

const AnimationDuration = 0.7;
const DescriptionVariants: Variants = {
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
}) => {
  const letters = Array.from(heading);
  const headerAnimationDuration = (letters.length - 1) * 0.1 + 0.7;

  return (
    <header className="flex flex-col space-y-3 | xl:pt-xl md:pt-x pt-lg">
      <motion.h1 className="overflow-hidden">
        <SlideupLettersAnimation className="xl:text-heading-4 text-heading-5 font-medium">
          {heading}
        </SlideupLettersAnimation>
      </motion.h1>
      <motion.h4
        initial="initial"
        animate="animate"
        variants={DescriptionVariants}
        custom={headerAnimationDuration}
        className="max-w-2xl | text-gray--700 text-body-1 font-manrope | pb-4"
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