import * as React from "react";
import memoize from "lodash/memoize";
import styled from "styled-components";
import CloseIconBase from "@icon/18-close-w.svg";
import SnackBarBase from "../base";

const CloseIcon = styled(CloseIconBase).attrs(props => ({
  size: "xs",
  touch: 18,
  iconColor: props.theme.colorV2.colorSet.fog50,
}))``;

export const getCloseIcon = (
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
): Moim.Snackbar.ISnackbarIconProps => ({
  width: 30,
  height: 30,
  component: <CloseIcon />,
  onClick: onClick,
});

function generator({
  bgColor,
  scale,
}: {
  bgColor?: string;
  scale?: Moim.Enums.ThemeColorScaleType;
}) {
  const SnackbarWithCloseIC: React.FC<Moim.Snackbar.IPresetProps &
    Moim.Snackbar.ISnackbarLeftIconProps &
    Moim.Snackbar.ISnackbarRightIconProps &
    Moim.Snackbar.ISnackbarCloseIconProps> = props => {
    return (
      <SnackBarBase
        colorScale={scale}
        bgColor={bgColor}
        text={props.text}
        textElement={props.textElement}
        onClick={props.onClick}
        leftIcon={props.leftIcon}
        rightIcon={props.rightIcon}
        rightSecondIcon={getCloseIcon(props.onClickClose)}
      />
    );
  };

  const Snackbar: React.FC<Moim.Snackbar.IPresetProps &
    Moim.Snackbar.ISnackbarLeftIconProps &
    Moim.Snackbar.ISnackbarRightIconProps &
    Moim.Snackbar.ISnackbarRightSecondIconProps> = props => {
    return (
      <SnackBarBase
        colorScale={scale}
        bgColor={bgColor}
        text={props.text}
        textElement={props.textElement}
        onClick={props.onClick}
        leftIcon={props.leftIcon}
        rightIcon={props.rightIcon}
        rightSecondIcon={props.rightSecondIcon}
      />
    );
  };

  return {
    SnackbarWithCloseIC,
    Snackbar,
  };
}

export default memoize(generator);
