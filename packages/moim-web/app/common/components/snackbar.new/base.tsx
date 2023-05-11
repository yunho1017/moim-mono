import * as React from "react";
import { Wrapper, Layer, Message, SnackbarIconClickWrapper } from "./styled";
import SnackbarThemeProvider from "./themeProvider";
import { useIntlShort } from "common/hooks/useIntlShort";

function renderIcon(icon?: Moim.Snackbar.ISnackbarIconProps) {
  if (!icon) {
    return null;
  }

  return (
    <SnackbarIconClickWrapper
      width={icon.width}
      height={icon.height}
      onClick={icon.onClick}
    >
      {icon.component}
    </SnackbarIconClickWrapper>
  );
}

const SnackBar = (
  props: Moim.Snackbar.IBaseProps &
    Partial<
      Moim.Snackbar.ISnackbarLeftIconProps &
        Moim.Snackbar.ISnackbarRightIconProps &
        Moim.Snackbar.ISnackbarRightSecondIconProps
    >,
) => {
  const {
    text,
    colorScale,
    textElement,
    bgColor,
    leftIcon,
    rightIcon,
    rightSecondIcon,
    onClick,
  } = props;
  const intl = useIntlShort();
  const handleClickSnackbar = React.useCallback<
    React.MouseEventHandler<HTMLDivElement>
  >(
    event => {
      event.stopPropagation();
      event.preventDefault();
      onClick?.();
    },
    [onClick],
  );

  return (
    <SnackbarThemeProvider scale={colorScale}>
      <Layer onClick={handleClickSnackbar}>
        <Wrapper bgColor={bgColor}>
          {renderIcon(leftIcon)}
          <Message>
            {textElement
              ? textElement
              : typeof text === "function"
              ? text(intl)
              : text}
          </Message>
          {renderIcon(rightIcon)}
          {renderIcon(rightSecondIcon)}
        </Wrapper>
      </Layer>
    </SnackbarThemeProvider>
  );
};

export default SnackBar;
