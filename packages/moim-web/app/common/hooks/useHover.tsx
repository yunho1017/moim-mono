import * as React from "react";

type UseHoverType<T extends HTMLElement> = [React.RefObject<T>, boolean];

export default function useHover<T extends HTMLElement>(): UseHoverType<T> {
  const [value, setValue] = React.useState(false);

  const ref = React.useRef<T>(null);

  React.useEffect(() => {
    const node = ref.current;
    const handleMouseEvent = (event: MouseEvent) =>
      setValue(event.type === "mouseenter");

    if (node) {
      node.addEventListener("mouseenter", handleMouseEvent);
      node.addEventListener("mouseleave", handleMouseEvent);

      return () => {
        node.removeEventListener("mouseenter", handleMouseEvent);
        node.removeEventListener("mouseleave", handleMouseEvent);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);

  return [ref, value];
}
