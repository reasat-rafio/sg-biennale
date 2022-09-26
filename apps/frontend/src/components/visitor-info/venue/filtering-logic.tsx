import { ReactNode } from "react";

interface FilteringLogicProps {
  children: ReactNode;
}

export const FilteringLogic: React.FC<FilteringLogicProps> = ({ children }) => {
  return <>{children}</>;
};
