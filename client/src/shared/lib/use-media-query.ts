import { useSyncExternalStore } from "react";

function subscribe(query: string, callback: () => void) {
  const mediaQuery = window.matchMedia(query);
  
  mediaQuery.addEventListener("change", callback);
  
  return () => {
    mediaQuery.removeEventListener("change", callback);
  };
}

function getSnapshot(query: string): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  
  return window.matchMedia(query).matches;
}

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => subscribe(query, callback),
    () => getSnapshot(query),
    () => false,
  );
}
