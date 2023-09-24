import { useEffect, useRef } from "react";

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
