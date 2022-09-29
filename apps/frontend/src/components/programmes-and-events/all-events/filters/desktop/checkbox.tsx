import { motion } from "framer-motion";

interface CheckboxProps {
  check: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({ check }) => {
  const color = "#DE5742";

  return (
    <motion.div
      className="h-6 w-6"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <motion.div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(0,0,0,0)",
          borderRadius: 12,
          width: 40,
          height: 40,
        }}
        whileTap={{ background: "rgba(0,0,0,0.05)" }}
      >
        <motion.div
          style={{
            height: 24,
            width: 24,
            border: "2px solid",
            borderColor: "#BBBBBB",
            borderRadius: 8,
            background: "rgba(0,0,0,0)",
          }}
          animate={{ borderColor: check ? color : "#BBBBBB" }}
          transition={{ type: "spring", stiffness: 800, damping: 80 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <motion.path
              fill="none"
              strokeWidth="2"
              stroke={color}
              d="M4.5 11L10 16.5L19.5 7"
              initial={false}
              animate={{ pathLength: check ? 1 : 0 }}
              transition={{ type: "spring", stiffness: 800, damping: 80 }}
            />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
