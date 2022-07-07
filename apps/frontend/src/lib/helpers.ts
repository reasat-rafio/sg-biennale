import { DateTime } from "luxon";

export const makeDuplicateArray = <T>(arr: T): T => {
  return JSON.parse(JSON.stringify(arr));
};

export const convertSecondsToAMPM = (
  value: number,
  showSuffix: boolean = true
) => {
  let _ = Math.floor(value / 3600);
  let hours = Math.floor((value - _ * 3600) / 60);
  let minutes = value - _ * 3600 - hours * 60;

  const suffix = hours >= 12 ? "PM" : "AM";

  const hourAMPM = ((hours + 11) % 12) + 1;
  const minAMPM = minutes < 10 ? `0${minutes}` : minutes;

  return showSuffix
    ? hourAMPM + ":" + minAMPM + suffix
    : hourAMPM + ":" + minAMPM;
};

export const convertDate = (value: Date, showSuffix: boolean = true) => {
  return showSuffix
    ? DateTime.fromISO(String(value)).toFormat("dd MMMM yyyy")
    : DateTime.fromISO(String(value)).toFormat("dd MMMM");
};

export const doTruncate = (text: string, endPosition: number) => {
  return text.slice(0, endPosition);
};
