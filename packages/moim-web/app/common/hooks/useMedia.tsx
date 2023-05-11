import { useState, useLayoutEffect, useCallback, useMemo } from "react";
import { isBrowser } from "common/helpers/envChecker";

export default function useMedia<T>(
  queries: string[],
  values: T[],
  defaultValue?: T,
) {
  // Array containing a media query list for each query
  const mediaQueryLists = useMemo(
    () => queries.map(q => isBrowser() && window.matchMedia(q)),
    [queries],
  );

  // Function that gets value based on matching media query
  const getValue = useCallback(() => {
    // Get index of first media query that matches
    const index = mediaQueryLists.findIndex(mql => mql && mql.matches);
    // Return related value or defaultValue if none
    return typeof values[index] !== "undefined" ? values[index] : defaultValue;
  }, [mediaQueryLists, values, defaultValue]);

  // State and setter for matched value
  const [value, setValue] = useState(getValue);

  useLayoutEffect(
    () => {
      // Event listener callback
      // Note: By defining getValue outside of useEffect we ensure that it has ...
      // ... current values of hook args (as this hook callback is created once on mount).
      const handler = () => setValue(getValue);
      // Set a listener for each media query with above handler as callback.
      mediaQueryLists.forEach(mql => mql && mql.addListener(handler));
      // Remove listeners on cleanup
      return () =>
        mediaQueryLists.forEach(mql => mql && mql.removeListener(handler));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  ); // Empty array ensures effect is only run on mount and unmount

  return value;
}
