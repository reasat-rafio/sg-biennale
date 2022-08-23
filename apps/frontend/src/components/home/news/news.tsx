import { Container } from "@components/ui/container";
import { INewsProps } from "@lib/@types/home.types";
import { Header } from "@components/ui/header";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { NewsCard } from "./card";

export interface NewsProps {
  type: string;
  news: INewsProps[];
  title: string;
}

export const News: React.FC<NewsProps> = ({ title, news }) => {
  return (
    <Container type="section" className="py-section">
      <Header type="h3">{title}</Header>

      <motion.div className="grid grid-cols-12 | pb-56  gap-x-5 gap-y-20 ">
        {news.map((newsData, index) => (
          <NewsCard
            key={newsData._id}
            {...newsData}
            index={index + 1}
            length={news.length}
          />
        ))}
      </motion.div>
    </Container>
  );
};
