import { Container } from "@components/ui/container";
import { Header } from "@components/ui/header";
import { INewsProps } from "@lib/@types/home.types";
import { motion } from "framer-motion";
import { NewsCard } from "./card";

export interface NewsProps {
  type: string;
  newsCollection: INewsProps[];
  title: string;
}

export const News: React.FC<NewsProps> = ({ title, newsCollection }) => {
  return (
    <Container type="section" className="pt-32 pb-60">
      <Header fontWeight={600}>{title}</Header>
      <motion.div className="grid grid-cols-12 | pb-56 2xl:gap-28 xl:gap-24 lg:gap-16 gap-3">
        {newsCollection.map((newsData, index) => (
          <NewsCard
            key={newsData._key}
            {...newsData}
            index={index + 1}
            length={newsCollection.length}
          />
        ))}
      </motion.div>
    </Container>
  );
};
