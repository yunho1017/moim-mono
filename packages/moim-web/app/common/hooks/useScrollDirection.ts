// NOTE: window에 event를 걸기 때문에 모바일 전용입니다
import { useLayoutEffect, useState } from "react";

const SCROLL_UP = "up";
const SCROLL_DOWN = "down";

const useScrollDirection = ({
  initialDirection = SCROLL_UP,
  threshold = 50,
}: {
  initialDirection?: "up" | "down";
  threshold?: number;
}) => {
  const [scrollDir, setScrollDir] = useState(initialDirection);

  useLayoutEffect(() => {
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;
      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }

      setScrollDir(scrollY > lastScrollY ? SCROLL_DOWN : SCROLL_UP);
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [initialDirection, threshold]);

  return scrollDir;
};

export default useScrollDirection;
