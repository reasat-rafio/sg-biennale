import { useFrame, useThree } from "@react-three/fiber";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as THREE from "three";

interface ScrollControlsState {
  el: HTMLDivElement;
  eps: number;
  fill: HTMLDivElement;
  fixed: HTMLDivElement;
  horizontal: boolean | undefined;
  damping: number;
  offset: number;
  delta: number;
  pages: number;
  range(from: number, distance: number, margin?: number): number;
  curve(from: number, distance: number, margin?: number): number;
  visible(from: number, distance: number, margin?: number): boolean;
}

const context = createContext<ScrollControlsState>(null!);

export function useScroll() {
  return useContext(context);
}

interface ScrollControlsProps {
  eps?: number;
  horizontal?: boolean;
  infinite?: boolean;
  pages?: number;
  distance?: number;
  damping?: number;
  enabled?: boolean;
  children: React.ReactNode;
}

export const ScrollControls: React.FC<ScrollControlsProps> = ({
  eps = 0.00001,
  enabled = true,
  infinite,
  horizontal,
  pages = 1,
  distance = 1,
  damping = 4,
  children,
}) => {
  const { gl, size, invalidate, events, raycaster } = useThree();
  const [el] = useState(() => document.createElement("div"));
  const [fill] = useState(() => document.createElement("div"));
  const [fixed] = useState(() => document.createElement("div"));
  const target = gl.domElement.parentNode!;
  const scroll = useRef(0);

  const state = useMemo(() => {
    const state = {
      el,
      eps,
      fill,
      fixed,
      horizontal,
      damping,
      offset: 0,
      delta: 0,
      scroll,
      pages,

      // 0-1 for a range between from -> from + distance
      range(from: number, distance: number, margin: number = 0) {
        let range;
        const start = from - margin;
        const end = start + distance + margin * 2;

        if (this.offset < start) range = 0;
        else if (this.offset > end) range = 1;
        else range = (this.offset - start) / (end - start);
        return range;
      },
      // 0-1-0 for a range between from -> from + distance
      curve(from: number, distance: number, margin: number = 0) {
        return Math.sin(this.range(from, distance, margin) * Math.PI);
      },
      // true/false for a range between from -> from + distance
      visible(from: number, distance: number, margin: number = 0) {
        const start = from - margin;
        const end = start + distance + margin * 2;
        return this.offset >= start && this.offset <= end;
      },
    };
    return state;
  }, [eps, damping, horizontal, pages]);

  useEffect(() => {
    const containerLength = size[horizontal ? "width" : "height"];
    const scrollLength = el[horizontal ? "scrollWidth" : "scrollHeight"];
    const scrollThreshold = scrollLength - containerLength;

    let current = 0;
    let disableScroll = true;
    let firstRun = true;

    const onScroll = () => {
      // Prevent first scroll because it is indirectly caused by the one pixel offset
      if (!enabled || firstRun) return;
      invalidate();
      current = el[horizontal ? "scrollLeft" : "scrollTop"];
      scroll.current = current / scrollThreshold;

      if (infinite) {
        if (!disableScroll) {
          if (scroll.current >= 1 - 0.001) {
            const damp = 1 - state.offset;
            el[horizontal ? "scrollLeft" : "scrollTop"] = 1;
            scroll.current = state.offset = -damp;
            disableScroll = true;
          } else if (current <= 0) {
            const damp = 1 + state.offset;
            el[horizontal ? "scrollLeft" : "scrollTop"] = scrollLength;
            scroll.current = state.offset = damp;
            disableScroll = true;
          }
        }
        if (disableScroll) setTimeout(() => (disableScroll = false), 40);
      }
      el.addEventListener("scroll", onScroll, { passive: true });
      requestAnimationFrame(() => (firstRun = false));

      const onWheel = (e: WheelEvent) => (el.scrollLeft += e.deltaY / 2);
      if (horizontal) el.addEventListener("wheel", onWheel, { passive: true });

      return () => {
        el.removeEventListener("scroll", onScroll);
        if (horizontal) el.removeEventListener("wheel", onWheel);
      };
    };
  }, [el, size, infinite, state, invalidate, horizontal]);

  let last = 0;
  useFrame((_, delta) => {
    state.offset = THREE.MathUtils.damp(
      (last = state.offset),
      scroll.current,
      damping,
      delta
    );
    state.delta = THREE.MathUtils.damp(
      state.delta,
      Math.abs(last - state.offset),
      damping,
      delta
    );
    if (state.delta > eps) invalidate();
  });

  return <context.Provider value={state}>{children}</context.Provider>;
};
