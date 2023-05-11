import * as React from "react";
import { IHookProps } from "./useProps";

export function useEffects(hookProps: IHookProps) {
  const { selectedColor, colorSet, onChange } = hookProps;

  React.useEffect(() => {
    const firstColor = colorSet[0];

    if (!selectedColor && firstColor) {
      onChange(firstColor);
    }
  }, []);
}
