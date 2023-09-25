import { useEffect, useRef } from "react";

/**
 * Scroll to the bottom of the given container ref when the specified dependency changes
 */
export default function useScrollBottom<
  T extends Array<any>,
  K extends HTMLElement
>(deps: T) {
  const containerRef = useRef<K>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, deps);

  return containerRef;
}
