import { Button } from "@components/ui/button";
import { Container } from "@components/ui/container";
import { Header } from "@components/ui/header";
import { PastEditionCollection } from "@lib/@types/about.types";
import { Cta } from "@lib/@types/global.types";
import {
  animationFrameEffect,
  useVisibleScrollEffect,
  useWindowSize,
} from "@lib/hooks";
import { imageUrlBuilder } from "@utils/sanity";
import clsx from "clsx";
import { useMotionValue } from "framer-motion";
import { useRef, useState } from "react";
import { SanityImg } from "sanity-react-extra";
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
  return (
    <Container
      type="section"
      className="py-max space-y-28 | bg-[#f8f8f8f8] z-40 relative"
    >
      <h2 className="text-heading-4 font-medium">{header}</h2>
      <div className={clsx("flex flex-wrap | mt-7 space-x-[2%]")}>
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
