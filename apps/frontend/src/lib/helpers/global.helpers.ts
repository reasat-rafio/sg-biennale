import { imageUrlBuilder } from "@utils/sanity";
import { MotionValue } from "framer-motion";
import { DateTime } from "luxon";
import * as THREE from "three";

export function lockBody() {
  document.body.style.top = `-${window.scrollY}px`;
  document.body.classList.add("locked");
}
export function unlockBody() {
  const scrollY = parseInt(document.body.style.top, 10) * -1;
  document.body.classList.remove("locked");
  document.body.style.top = "";
  window.scrollTo({ top: scrollY, behavior: "smooth" });
}

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

export function sliceIntoChunks<T>(arr: T[], chunkSize: number): T[][] {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
}

export const positioningAlgo = (arrLen: number) => {
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
