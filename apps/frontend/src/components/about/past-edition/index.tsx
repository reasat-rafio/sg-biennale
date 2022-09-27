import { Button } from "@components/ui/button";
import { Container } from "@components/ui/container";
import { PastEditionCollection } from "@lib/@types/about.types";
import { Cta } from "@lib/@types/global.types";
import useAboutStore from "@stores/about.store";
import clsx from "clsx";
import { useEffect } from "react";
import { Card } from "./card";

interface PastEditionProps {
  type: string;
  header: string;
  pastEditionCollection: PastEditionCollection[];
  cta: Cta;
}

export const PastEdition: React.FC<PastEditionProps> = ({
  header,
  pastEditionCollection,
  cta,
}) => {
  const { setPastEditions } = useAboutStore();
  useEffect(() => {
    setPastEditions(pastEditionCollection);
  }, [pastEditionCollection]);

  return (
    <Container
      type="section"
      className="py-max space-y-28 | bg-[#F8F8F8] z-40 relative"
    >
      <h2 className="text-heading-4 font-medium">{header}</h2>
      <div className={clsx("grid grid-cols-12 lg:gap-10 gap-5 | mt-7 ")}>
        {pastEditionCollection.map((data, index) => (
          <Card {...data} index={index + 1} />
        ))}
      </div>

      <div className="pt-5">
        <Button className="mx-auto " variant="secondary">
          {cta.title}
        </Button>
      </div>
    </Container>
  );
};
