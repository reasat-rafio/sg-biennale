import { imageUrlBuilder } from "@utils/sanity";
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

export const makeOpenGraphImages = (
  ogImage: any,
  metaTitle: string | undefined
) => {
  return ogImage
    ? [
        { w: 800, h: 600 },
        { w: 1200, h: 630 },
        { w: 600, h: 600 },
        { w: 256, h: 256 },
      ].map(({ w, h }) => ({
        url: `${imageUrlBuilder.image(ogImage).width(w).height(h).url()}`,
        width: w,
        height: h,
        alt: `${metaTitle ?? "og image"}`,
      }))
    : [];
};

export function ChunkArray<T>(a: T[], n: number): T[][] {
  const b = Math.ceil(a.length / n);
  return [...Array(n)].map((_, i) => a.slice(i * b, (i + 1) * b));
}
