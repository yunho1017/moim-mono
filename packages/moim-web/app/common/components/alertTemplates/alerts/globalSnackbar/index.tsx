// constants
import * as React from "react";
import {
  Error,
  Success,
  Normal,
  CustomMeeting,
} from "common/components/snackbar.new";

export interface IProps
  extends Moim.Snackbar.IPresetProps,
    Moim.Snackbar.ISnackbarLeftIconProps,
    Moim.Snackbar.ISnackbarRightIconProps,
    Moim.Snackbar.ISnackbarRightSecondIconProps {
  type?: Moim.Snackbar.GLOBAL_ALERT_SNACKBAR_TYPE;
}

function GlobalSnackbar({
  text,
  textElement,
  type = "normal",
  leftIcon,
  rightIcon,
  rightSecondIcon,
  onClick,
}: IProps) {
  switch (type) {
    case "normal":
    case "info":
      return (
        <Normal.Snackbar
          text={text}
          textElement={textElement}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          rightSecondIcon={rightSecondIcon}
          onClick={onClick}
        />
      );
    case "success":
      return (
        <Success.Snackbar
          text={text}
          textElement={textElement}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          rightSecondIcon={rightSecondIcon}
          onClick={onClick}
        />
      );
    case "error":
      return (
        <Error.Snackbar
          text={text}
          textElement={textElement}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          rightSecondIcon={rightSecondIcon}
          onClick={onClick}
        />
      );
    case "custom-meeting":
      return (
        <CustomMeeting
          text={text}
          textElement={textElement}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          rightSecondIcon={rightSecondIcon}
          onClick={onClick}
        />
      );
  }
}

export default GlobalSnackbar;
