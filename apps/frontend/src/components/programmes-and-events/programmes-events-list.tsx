import useProgrammesAndEventsStore from "@stores/programme-event-store";
import { ProgrammeEventListCard } from "./programme-event-list-card";

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

  const extraPadding = onScreenProgrammesAndEvents.reduce(
    (previousValue, _, idx) => previousValue + 50 * idx,
    0
  );

  return (
    <section className="pt-2" style={{ paddingBottom: extraPadding / 2 }}>
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
    </section>
  );
};
