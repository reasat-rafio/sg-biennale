import { Container } from "@components/ui/container";
import { Header } from "@components/ui/header";
import { PastEditionCollection } from "@lib/@types/about.types";
import useAboutStore from "@stores/about.store";
import clsx from "clsx";
import { useEffect } from "react";
import { Card } from "./card";

interface PastEditionProps {
  type: string;
  header: string;
  pastEditionCollection: PastEditionCollection[];
}

export const PastEdition: React.FC<PastEditionProps> = ({
  header,
  pastEditionCollection,
}) => {
  const { setPastEditions } = useAboutStore();
  useEffect(() => {
    setPastEditions(pastEditionCollection);
  }, [pastEditionCollection]);

  return (
    <Container
      type="section"
      className="py-max space-y-28 | bg-[#F8F8F8] relative"
    >
      <Header>{header}</Header>
      <div className={clsx("grid grid-cols-12 lg:gap-10 gap-5 | mt-7 ")}>
        {pastEditionCollection.map((data, index) => (
          <Card {...data} index={index + 1} />
        ))}
      </div>
    </Container>
  );
};
