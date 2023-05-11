import PopupWindowClass from "common/helpers/popupWindowClass";

export interface IOptions {
  url?: string;
  width: number;
  height: number;
  id?: string;
  top?: number;
  left?: number;
  failMessage?: string;
  disableCanPassLoading?: boolean;
}

export default function popupWindow({
  url = "",
  id = "sign",
  width,
  height,
  top,
  left,
  failMessage,
  disableCanPassLoading,
}: IOptions) {
  const options: Record<string, string | number | boolean> = {
    width: width ? width : "100%",
    height: height ? height : "100%",
    top: top || window.screen.height / 2 - height / 2,
    left: left || window.screen.width / 2 - width / 2,
    centerscreen: true,
    menubar: "no",
    status: "no",
    titlebar: "no",
  };

  return new PopupWindowClass(
    options,
    url,
    id,
    disableCanPassLoading,
    failMessage,
  );
}
