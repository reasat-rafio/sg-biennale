import { Button } from "@components/ui/button";
import { Container } from "@components/ui/container";
import { AccesibilityInfoProps } from "@lib/@types/visitor-info.types";
import { motion, Variants } from "framer-motion";

const SlideUpVariants: Variants = {
  initial: {
    opacity: 0,
    y: "100%",
  },
  animate: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      opacity: { duration: 0.3 },
      y: {
        delay: delay,
        type: "tween",
        ease: "easeInOut",
        duration: 0.4,
      },
    },
  }),
};

export const AccesibilityInfo: React.FC<AccesibilityInfoProps> = ({
  header,
  infos,
  cta,
}) => {
  return (
    <section className="md:py-xxl py-xl | bg-gray--100">
      <Container className="space-y-14">
        <motion.h2
          initial="initial"
          whileInView="animate"
          variants={SlideUpVariants}
          custom={0.3}
          className="text-[32px] font-medium tracking-[-0.02em]"
        >
          {header}
        </motion.h2>
        <motion.ul className="grid grid-cols-12 | lg:gap-10 gap-8">
          {infos.map(({ _key, description, title }, index) => (
            <motion.li
              initial="initial"
              whileInView="animate"
              variants={SlideUpVariants}
              custom={(index + 1) * 0.1 + 0.3}
              className="xl:col-span-4 md:col-span-6 col-span-12 | space-y-2 | font-manrope"
              key={_key}
            >
              <h5 className="text-body-1 font-bold">{title}</h5>
              <p className="text-gray--700 text-body-1">{description}</p>
            </motion.li>
          ))}
        </motion.ul>
        <motion.div
          initial="initial"
          whileInView="animate"
          variants={SlideUpVariants}
          custom={1}
          className="flex justify-center items-center"
        >
          <Button variant="secondary">{cta.title}</Button>
        </motion.div>
      </Container>
    </section>
  );
};
