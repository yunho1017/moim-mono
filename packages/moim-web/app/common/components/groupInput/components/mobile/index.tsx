import React, { useRef } from "react";
import { Wrapper, InputWrapper } from "./styled";
import MobileToolbar from "./toolbar";
import ClickAwayListener from "@mui/material/ClickAwayListener";

export default function MobileGroupInput({
  id,
  isExpand: isExpandProps,
  children,
}: React.PropsWithChildren<{
  id: string;
  isExpand: boolean;
  hasFileContent: boolean;
  hasMeetingFileContent: boolean;
}>) {
  const [isExpand, setIsExpand] = React.useState(isExpandProps);
  const refGroupInputWrapper = useRef<HTMLDivElement>(null);

  const handleFocus = React.useCallback(() => {
    setIsExpand(true);
  }, []);

  const handleClickAway = React.useCallback(() => {
    if (
      refGroupInputWrapper.current &&
      refGroupInputWrapper.current.innerText?.length < 2
    ) {
      setIsExpand(false);
    }
  }, []);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Wrapper isExpand={isExpand} ref={refGroupInputWrapper}>
        <InputWrapper onFocus={handleFocus}>{children}</InputWrapper>
        <MobileToolbar id={id} isExpand={isExpand} />
      </Wrapper>
    </ClickAwayListener>
  );
}
