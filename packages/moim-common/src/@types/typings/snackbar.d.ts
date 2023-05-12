declare namespace Moim {
  declare namespace Snackbar {
    interface IPresetProps {
      text?: string | ((intl: any) => string);
      textElement?: JSX.Element;
      onClick?: () => void;
      timeout?: number | null;
    }
    interface IBaseProps extends IPresetProps {
      bgColor?: string;
      colorScale?: Moim.Enums.ThemeColorScaleType;
    }

    interface ISnackbarIconProps {
      width?: number;
      height?: number;
      component: React.ReactNode;
      onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    }

    interface ISnackbarLeftIconProps {
      leftIcon?: ISnackbarIconProps;
    }

    interface ISnackbarRightIconProps {
      rightIcon?: ISnackbarIconProps;
    }

    interface ISnackbarRightSecondIconProps {
      rightSecondIcon?: ISnackbarIconProps;
    }

    interface ISnackbarCloseIconProps {
      onClickClose?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    }
    type GLOBAL_ALERT_SNACKBAR_TYPE =
      | "normal" // default
      | "error"
      | "success"
      | "info"
      | "custom-meeting";
  }
}
