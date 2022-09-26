import { IPgrammeEvents } from "@lib/@types/programmes-events-types";

export const filterPastEvents = (
  currentISODate: string,
  allEvents: IPgrammeEvents[]
): IPgrammeEvents[] => {
  const filterEevnts = allEvents.filter(
    ({ startAt }) => startAt.toString() > currentISODate
  );

  return filterEevnts;
};
