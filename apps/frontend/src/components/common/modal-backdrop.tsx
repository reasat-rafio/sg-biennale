import { X } from "@components/icons/x";
import { Portal } from "@reach/portal";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ReactNode } from "react";

interface ModalBackdropProps {
  show: boolean;
  setSelectedVisible: (data: string | null) => void;
  children: ReactNode;
}

export const BackDropVariants: Variants = {
  hidden: {
    opacity: 0,
    transition: {
      display: {
        delay: 0.5,
      },
    },
  },
  enter: {
    opacity: 1,
    transition: {},
  },
};

export const ModalBackdrop: React.FC<ModalBackdropProps> = ({
  show,
  children,
  setSelectedVisible,
}) => {
  return (
    <Portal>
      <AnimatePresence>
        {show && (
          <motion.div
            initial="hidden"
            animate="enter"
            exit="hidden"
            variants={BackDropVariants}
            className="fixed min-h-screen w-screen top-0 left-0 z-50  | bg-white"
          >
            <motion.span
              onClick={() => setSelectedVisible(null)}
              className="fixed top-10 right-10 | bg-white p-1 rounded-full  | cursor-pointer"
              whileHover={{ scale: 1.1 }}
            >
              <X className="lg:h-9 lg:w-9 w-7 h-7" />
            </motion.span>

            <div className="max-w-6xl | lg:flex justify-center items-center | mx-auto lg:h-[80vh] h-screen lg:my-[10vh] overflow-y-auto | py-x lg:py-0 overflow-x-hidden">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
};
