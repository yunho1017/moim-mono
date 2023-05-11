import * as React from "react";
import { IProps } from "../";
import useIsMobile from "common/hooks/useIsMobile";

export type IHookProps = ReturnType<typeof useProps>;

export function useProps(props: IProps) {
  const isMobile = useIsMobile();
  const colorDialogGridWrapperRef = React.useRef<HTMLDivElement>(null);
  const [isOpenColorDialog, setOpenColorDialog] = React.useState<boolean>(
    false,
  );
  const dialogHeight = React.useMemo(
    () =>
      colorDialogGridWrapperRef.current
        ? colorDialogGridWrapperRef.current.clientHeight
        : undefined,
    [colorDialogGridWrapperRef.current],
  );

  return {
    ...props,
    isMobile,
    dialogHeight,
    colorDialogGridWrapperRef,
    isOpenColorDialog,
    setOpenColorDialog,
  };
}
