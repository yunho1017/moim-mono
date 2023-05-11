import { useState, useEffect } from "react";
import { isBrowser } from "common/helpers/envChecker";

export default function useDevicePixcelRatio() {
  const [ratio, setRatio] = useState(isBrowser() ? window.devicePixelRatio : 1);
  useEffect(() => {
    if (isBrowser()) {
      window
        .matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`)
        .addListener(() => {
          setRatio(window.devicePixelRatio);
        });
    }
  }, []);
  return ratio;
}
