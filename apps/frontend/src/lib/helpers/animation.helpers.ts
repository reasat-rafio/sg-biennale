import { MotionValue, useTransform, useSpring } from "framer-motion";

interface TransformSpringProps {
  value: MotionValue;
  outputRange: [number, number];
  inputRange?: [number, number];
  physics?: any;
}
export const useTransformSpring = ({
  value,
  outputRange,
  inputRange = [0, 1],
  physics,
}: TransformSpringProps) => {
  const transformValue = useTransform(value, inputRange, outputRange);
  const springValue = useSpring(transformValue, physics);
  return springValue;
};
