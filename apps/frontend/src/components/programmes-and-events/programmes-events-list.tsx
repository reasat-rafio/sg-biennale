import { ChevronArrow } from "@components/icons/chevron-arrow";
import useProgrammesAndEventsStore from "@stores/programme-event-store";
import { ProgrammeEventListCard } from "./programme-event-list-card";
import clsx from "clsx";

interface ProgrammesEventListProps {}

const positioningAlgo = (arrLen: number) => {
  const length = Math.ceil(arrLen / 2);
  const res = [];
  for (let i = 0; i < length - 1; i++) {
    for (let j = 0; j < 2; j++) {
      i % 2 ? res.push(1) : res.push(0);
    }
  }
  res.unshift(1);
  res.push(0);
  return res;
};

export const ProgrammesEventList: React.FC<ProgrammesEventListProps> = ({}) => {
  const { onScreenProgrammesAndEvents, setOnScreenProgrammesAndEvents } =
    useProgrammesAndEventsStore();

  const imgPositionIngAlgo = positioningAlgo(
    onScreenProgrammesAndEvents.length
  );

  const viewMoreAction = () => {};
  const viewLessAction = () => {};

  return (
    <section className="pb-[50vh] pt-2">
      <div className="grid grid-cols-12 | lg:gap-8 gap-4">
        {onScreenProgrammesAndEvents?.map((pgrmEvnt, index) => (
          <ProgrammeEventListCard
            {...pgrmEvnt}
            key={pgrmEvnt._id}
            index={index}
            imgPositionIngAlgo={imgPositionIngAlgo}
          />
        ))}
      </div>

      {/* <div className="flex justify-center items-center | my-5">
        <button className="flex items-center | space-x-2">
          <span>View More </span>
        </button>
      </div> */}
    </section>
  );
};
