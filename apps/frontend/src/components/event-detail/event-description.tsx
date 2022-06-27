import { EventDescriptionProps } from "@lib/@types/event.types";
import clsx from "clsx";

export const EventDescription: React.FC<EventDescriptionProps> = ({
  className,
}) => {
  return <div className={clsx(className)}></div>;
};
