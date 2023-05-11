import * as React from "react";
import styled from "styled-components";
import { ThemeColorScaleTypes } from "app/enums";
import {
  Wrapper as WrapperBase,
  Message,
  Layer,
  SnackbarIconClickWrapper,
} from "../../styled";
import SnackbarThemeProvider from "../../themeProvider";
import { useIntlShort } from "common/hooks/useIntlShort";

const Wrapper = styled(WrapperBase)`
  flex-direction: column;
  align-items: flex-start;
`;

const Body = styled.div`
  width: 100%;
`;
const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

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

const CustomSnackBar = (
  props: Moim.Snackbar.IBaseProps &
    Partial<
      Moim.Snackbar.ISnackbarLeftIconProps &
        Moim.Snackbar.ISnackbarRightIconProps &
        Moim.Snackbar.ISnackbarRightSecondIconProps
    >,
) => {
  const {
    text,
    colorScale = ThemeColorScaleTypes.WHITE,
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
          <Body>
            {renderIcon(leftIcon)}
            <Message>
              {textElement
                ? textElement
                : typeof text === "function"
                ? text(intl)
                : text}
            </Message>
          </Body>
          <Footer>
            {renderIcon(rightIcon)}
            {renderIcon(rightSecondIcon)}
          </Footer>
        </Wrapper>
      </Layer>
    </SnackbarThemeProvider>
  );
};

export default CustomSnackBar;
