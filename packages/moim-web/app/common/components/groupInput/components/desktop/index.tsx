import React, { useRef } from "react";
import { Wrapper, InputWrapper } from "./styled";
import DesktopToolbar from "./toolbar";
import ClickAwayListener from "@mui/material/ClickAwayListener";

export default function DesktopGroupInput({
  id,
  hasFileContent,
  hasMeetingFileContent,
  isExpand: isExpandProps,
  children,
}: React.PropsWithChildren<{
  id: string;
  hasFileContent: boolean;
  hasMeetingFileContent: boolean;
  isExpand: boolean;
}>) {
  const [isExpand, setIsExpand] = React.useState(isExpandProps);
  const [showTextStyle, setShowTextStyle] = React.useState(false);
  const refGroupInputWrapper = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!isExpand && (hasFileContent || hasMeetingFileContent)) {
      setIsExpand(true);
    }
  }, [hasFileContent, hasMeetingFileContent, isExpand]);

  const handleClickShowTextStyleButton = React.useCallback(() => {
    if (!isExpand) {
      setIsExpand(true);
    }

    setShowTextStyle(status => !status);
  }, [isExpand]);

  const handleFocusInputWrapper = React.useCallback(() => {
    if (!isExpand) {
      setIsExpand(true);
    }
  }, [isExpand]);

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
        <InputWrapper onFocus={handleFocusInputWrapper}>
          {children}
        </InputWrapper>

        <DesktopToolbar
          id={id}
          showTextStyle={showTextStyle}
          onClickShowTextStyleButton={handleClickShowTextStyleButton}
        />
      </Wrapper>
    </ClickAwayListener>
  );
}
