import {
  Dispatch,
  SetStateAction,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
/* eslint-disable react-hooks/exhaustive-deps */
import { RefObject, useEffect, useState } from "react";

type Cleanup = void | (() => void);
export type Size = { width: number; height: number };
export type Position = { x: number; y: number };
export type Intersection = {
  intersectionRatio: number;
  isIntersecting: boolean;
  offsetBoundingRect: DOMRectReadOnly;
};
type IntersectionOptions = {
  rootMargin?: string;
  threshold?: number | number[];
};
type VisibleScroll = {
  offsetBoundingRect: DOMRectReadOnly;
  x: number;
  y: number;
};

export function runCleanup(cleanup: Cleanup) {
  if (cleanup instanceof Function) {
    cleanup();
  }
}

export function windowSizeEffect(
  effect: (width: number, height: number) => Cleanup
): () => void {
  let cleanup: Cleanup;
  const onResize = () => {
    runCleanup(cleanup);
    cleanup = effect(window.innerWidth, window.innerHeight);
  };
  window.addEventListener("resize", onResize);
  onResize();
  return () => {
    runCleanup(cleanup);
    window.removeEventListener("resize", onResize);
  };
}

// Always pass in a callback made with useCallback!
export function useWindowSizeEffect(
  effect: (width: number, height: number) => Cleanup,
  deps: any[]
) {
  useEffect(() => windowSizeEffect(effect), deps);
}

export function useWindowSize(): Size | undefined {
  const [windowSize, setWindowSize] = useState<Size>();
  useWindowSizeEffect((width, height) => setWindowSize({ width, height }), []);
  return windowSize;
}

export function windowScrollEffect(
  effect: (x: number, y: number) => Cleanup
): () => void {
  let cleanup: Cleanup;
  const onScroll = () => {
    runCleanup(cleanup);
    cleanup = effect(window.scrollX, window.scrollY);
  };
  document.addEventListener("scroll", onScroll);
  onScroll();
  return () => {
    runCleanup(cleanup);
    document.removeEventListener("scroll", onScroll);
  };
}

// Always pass in a callback made with usecallback!
export function useWindowScrollEffect(
  effect: (x: number, y: number) => Cleanup,
  deps: any[]
) {
  useEffect(() => windowScrollEffect(effect), deps);
}

export function useWindowScroll(): Position | undefined {
  const [scroll, setScroll] = useState<Position>();
  useWindowScrollEffect((x, y) => setScroll({ x, y }), []);
  return scroll;
}

export function animationFrameEffect(effect: () => Cleanup): () => void {
  let cleanup: Cleanup;
  const frameId = window.requestAnimationFrame(() => {
    runCleanup(cleanup);
    cleanup = effect();
  });
  return () => {
    runCleanup(cleanup);
    window.cancelAnimationFrame(frameId);
  };
}

// cb should be created with useCallback
export function useAnimationFrameEffect(effect: () => Cleanup, deps: any[]) {
  useEffect(() => animationFrameEffect(effect), deps);
}

export function intersectionObserverEffect(
  element: RefObject<Element>,
  effect: (intersection: Intersection) => Cleanup,
  options?: IntersectionOptions
): () => void {
  let cleanup: Cleanup;
  const observer = new IntersectionObserver(
    (entries) => {
      runCleanup(cleanup);
      const boundingRect = entries[0].boundingClientRect;
      const top = boundingRect.top + window.scrollY;
      const left = boundingRect.left + window.scrollX;

      cleanup = effect({
        intersectionRatio: entries[0].intersectionRatio,
        isIntersecting: entries[0].isIntersecting,
        offsetBoundingRect: new DOMRectReadOnly(
          left,
          top,
          boundingRect.width,
          boundingRect.height
        ),
      });
    },
    {
      root: null,
      rootMargin: options?.rootMargin,
      threshold: options?.threshold,
    }
  );
  if (element?.current) {
    observer.observe(element.current);
  }
  return () => {
    runCleanup(cleanup);
    observer.disconnect();
  };
}

// ensure that usecallback is passed in!
export function useIntersectionEffect(
  element: RefObject<Element>,
  effect: (intersection: Intersection) => void,
  deps: any[],
  options?: IntersectionOptions
) {
  const { rootMargin, threshold } = options ?? {
    rootMargin: undefined,
    threshold: undefined,
  };
  useEffect(
    () =>
      intersectionObserverEffect(element, effect, { rootMargin, threshold }),
    [element, rootMargin, threshold, ...deps]
  );
}

export function useIntersection(
  element: RefObject<Element>,
  options?: IntersectionOptions
): Intersection | undefined {
  const [intersection, setIntersection] = useState<Intersection>();
  useIntersectionEffect(element, setIntersection, [], options);
  return intersection;
}

export function useVisibleScrollEffect(
  element: RefObject<Element>,
  effect: (offsetBoundingRect: DOMRectReadOnly, x: number, y: number) => void,
  deps: any[],
  options?: IntersectionOptions
) {
  useIntersectionEffect(
    element,
    (intersection) => {
      if (intersection.isIntersecting) {
        return windowScrollEffect(() =>
          effect(
            intersection.offsetBoundingRect,
            window.scrollX,
            window.scrollY
          )
        );
      }
    },
    deps,
    options
  );
}

export function useVisibleScroll(
  element: RefObject<Element>,
  options?: IntersectionOptions
) {
  const [visibleScroll, setVisibleScroll] = useState<VisibleScroll>();
  useVisibleScrollEffect(
    element,
    (offsetBoundingRect, x, y) =>
      setVisibleScroll({ offsetBoundingRect, x, y }),
    [],
    options
  );
  return visibleScroll;
}

export const useScroll = () => {
  const elRef = useRef<null | HTMLDivElement>(null);
  const executeScroll: any = () => elRef?.current?.scrollIntoView();

  return [executeScroll, elRef];
};

export const useOutsideClick = (
  ref: RefObject<Element>,
  action: { setState?: Dispatch<SetStateAction<any>>; dispatch?: any }
) => {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (action?.setState) {
          action.setState(false);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

interface IPortableTextHook {
  maxLength: number;
}

const doTruncate = (text: string, endPosition: number) => {
  return text.slice(0, endPosition);
};

export const usePortableTextTruncate = ({
  maxLength,
}: IPortableTextHook): [
  (node: HTMLElement | null) => void,
  Dispatch<SetStateAction<number>>
] => {
  const [_maxLength, setMaxlength] = useState(maxLength);

  const ref = useCallback(
    (node: HTMLElement | null) => {
      if (node !== null) {
        const childElement = node?.children;
        const childElementTextContent = childElement[0].textContent;

        childElement[0].innerHTML = `${doTruncate(
          childElementTextContent as string,
          _maxLength
        )} ${
          (childElementTextContent?.length as number) > _maxLength ? "..." : ""
        }`;
      }
    },
    [_maxLength]
  );
  return [ref, setMaxlength];
};

export type UseMeasureRect = Pick<
  DOMRectReadOnly,
  "x" | "y" | "top" | "left" | "right" | "bottom" | "height" | "width"
>;
export type UseMeasureRef<E extends Element = Element> = (element: E) => void;
export type UseMeasureResult<E extends Element = Element> = [
  UseMeasureRef<E>,
  UseMeasureRect
];

const defaultState: UseMeasureRect = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

export const isBrowser = typeof window !== "undefined";
const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;
const noop = () => {};
export function useMeasure<E extends Element = Element>(): UseMeasureResult<E> {
  const [element, ref] = useState<E | null>(null);
  const [rect, setRect] = useState<UseMeasureRect>(defaultState);

  const observer = useMemo(
    () =>
      isBrowser &&
      new (window as any).ResizeObserver((entries: any) => {
        if (entries[0]) {
          const { x, y, width, height, top, left, bottom, right } =
            entries[0].contentRect;
          setRect({ x, y, width, height, top, left, bottom, right });
        }
      }),
    []
  );

  useIsomorphicLayoutEffect(() => {
    if (!element) return;
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [element]);

  return [ref, rect];
}

export default isBrowser &&
typeof (window as any).ResizeObserver !== "undefined"
  ? useMeasure
  : ((() => [noop, defaultState]) as typeof useMeasure);

export function useLongPress(callback = () => {}, ms = 300) {
  const [startLongPress, setStartLongPress] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;
    if (startLongPress) {
      timerId = setTimeout(callback, ms);
    } else {
      if (timerId !== null) clearTimeout(timerId);
    }

    return () => {
      if (timerId !== null) clearTimeout(timerId);
    };
  }, [callback, ms, startLongPress]);

  return {
    onMouseDown: () => setStartLongPress(true),
    onMouseUp: () => setStartLongPress(false),
    onMouseLeave: () => setStartLongPress(false),
    onTouchStart: () => setStartLongPress(true),
    onTouchEnd: () => setStartLongPress(false),
  };
}
